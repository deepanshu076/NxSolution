import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const JWT_SECRET = process.env.JWT_SECRET || "dev-jwt-secret-change-me";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const IS_PROD = process.env.NODE_ENV === "production";

type AuthUser = {
  id: string;
  email: string;
  full_name: string | null;
  role: "user" | "admin";
};

type JwtPayload = {
  sub: string;
  email: string;
  role: "user" | "admin";
};

async function startServer() {
  const app = express();
  const PORT = 3000;
  const supabaseUrl = process.env.VITE_SUPABASE_URL?.trim();
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      "Missing Supabase server credentials. Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  if (!supabaseServiceRoleKey.startsWith("eyJ")) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY looks invalid. Copy the service_role key from Supabase Settings > API.",
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false },
  });

  app.use(express.json());

  app.use((error: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (
      error &&
      typeof error === "object" &&
      "type" in error &&
      (error as { type?: string }).type === "entity.parse.failed"
    ) {
      res.status(400).json({ error: "Invalid JSON payload." });
      return;
    }
    next(error);
  });

  const buildToken = (user: AuthUser) =>
    jwt.sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
      } satisfies JwtPayload,
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"] },
    );

  const sanitizeUser = (user: AuthUser) => ({
    id: user.id,
    email: user.email,
    name: user.full_name || user.email,
    role: user.role,
  });

  const requireAuth: express.RequestHandler = async (req, res, next) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice("Bearer ".length)
      : null;

    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    try {
      const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
      (req as express.Request & { auth?: JwtPayload }).auth = payload;
      next();
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  };

  const requireAdmin: express.RequestHandler = (req, res, next) => {
    const auth = (req as express.Request & { auth?: JwtPayload }).auth;
    if (!auth || auth.role !== "admin") {
      res.status(403).json({ error: "Admin access required" });
      return;
    }
    next();
  };

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { name, email, password, isAdmin } = req.body ?? {};
      if (!name || !email || !password) {
        res.status(400).json({ error: "Name, email and password are required." });
        return;
      }

      if (String(password).length < 8) {
        res.status(400).json({ error: "Password must be at least 8 characters." });
        return;
      }

      const normalizedEmail = String(email).trim().toLowerCase();
      const { data: existing, error: existingError } = await supabase
        .from("users")
        .select("id")
        .eq("email", normalizedEmail)
        .maybeSingle();

      if (existingError) {
        console.error("[JWT Auth] signup existing user check failed", existingError);
        res.status(500).json({
          error: IS_PROD
            ? "Failed to validate user."
            : `Failed to validate user: ${existingError.message}`,
        });
        return;
      }

      if (existing) {
        res.status(409).json({ error: "Email already in use." });
        return;
      }

      const password_hash = await bcrypt.hash(String(password), 10);
      const payload = {
        email: normalizedEmail,
        full_name: String(name).trim(),
        role: isAdmin ? "admin" : "user",
        password_hash,
      };

      const { data: created, error: createError } = await supabase
        .from("users")
        .insert(payload)
        .select("id, email, full_name, role")
        .single();

      if (createError || !created) {
        console.error("[JWT Auth] signup create user failed", createError);
        res.status(500).json({
          error: IS_PROD
            ? "Unable to create user."
            : `Unable to create user: ${createError?.message || "unknown error"}`,
        });
        return;
      }

      const token = buildToken(created as AuthUser);
      res.status(201).json({ token, user: sanitizeUser(created as AuthUser) });
    } catch (error) {
      console.error("[JWT Auth] signup error", error);
      res.status(500).json({ error: "Signup failed." });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body ?? {};
      if (!email || !password) {
        res.status(400).json({ error: "Email and password are required." });
        return;
      }

      const normalizedEmail = String(email).trim().toLowerCase();
      const { data: user, error } = await supabase
        .from("users")
        .select("id, email, full_name, role, password_hash")
        .eq("email", normalizedEmail)
        .maybeSingle();

      if (error) {
        console.error("[JWT Auth] login fetch user failed", error);
        res.status(500).json({
          error: IS_PROD
            ? "Unable to sign in."
            : `Unable to sign in: ${error.message}`,
        });
        return;
      }

      if (!user?.password_hash) {
        res.status(401).json({ error: "Invalid credentials." });
        return;
      }

      const isMatch = await bcrypt.compare(String(password), user.password_hash);
      if (!isMatch) {
        res.status(401).json({ error: "Invalid credentials." });
        return;
      }

      const token = buildToken(user as AuthUser);
      res.json({ token, user: sanitizeUser(user as AuthUser) });
    } catch (error) {
      console.error("[JWT Auth] login error", error);
      res.status(500).json({ error: "Login failed." });
    }
  });

  app.get("/api/auth/me", requireAuth, async (req, res) => {
    const auth = (req as express.Request & { auth?: JwtPayload }).auth;
    if (!auth) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("id, email, full_name, role")
      .eq("id", auth.sub)
      .maybeSingle();

    if (error) {
      console.error("[JWT Auth] me failed", error);
      res.status(500).json({
        error: IS_PROD
          ? "Failed to fetch user."
          : `Failed to fetch user: ${error.message}`,
      });
      return;
    }

    if (!user) {
      res.status(401).json({ error: "User not found." });
      return;
    }

    res.json({ user: sanitizeUser(user as AuthUser) });
  });

  app.post("/api/auth/logout", (_req, res) => {
    res.json({ success: true });
  });

  app.get("/api/admin/check", requireAuth, requireAdmin, (_req, res) => {
    res.json({ success: true });
  });

  app.get("/api/admin/users", requireAuth, requireAdmin, async (_req, res) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("id, email, full_name, role, avatar_url")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("[Admin Users] fetch failed", error);
        res.status(500).json({ error: "Failed to fetch users." });
        return;
      }

      res.json({ users: data ?? [] });
    } catch (error) {
      console.error("[Admin Users] unexpected error", error);
      res.status(500).json({ error: "Failed to fetch users." });
    }
  });

  app.put("/api/admin/users/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const payload = req.body ?? {};

      const { data, error } = await supabase
        .from("users")
        .update({
          full_name: payload.full_name,
          role: payload.role,
          avatar_url: payload.avatar_url,
        })
        .eq("id", id)
        .select("id, email, full_name, role, avatar_url")
        .single();

      if (error || !data) {
        console.error("[Admin Users] update failed", error);
        res.status(500).json({ error: "Failed to update user." });
        return;
      }

      res.json({ user: data });
    } catch (error) {
      console.error("[Admin Users] unexpected update error", error);
      res.status(500).json({ error: "Failed to update user." });
    }
  });

  app.delete("/api/admin/users/:id", requireAuth, requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { error } = await supabase.from("users").delete().eq("id", id);

      if (error) {
        console.error("[Admin Users] delete failed", error);
        res.status(500).json({ error: "Failed to delete user." });
        return;
      }

      res.json({ success: true });
    } catch (error) {
      console.error("[Admin Users] unexpected delete error", error);
      res.status(500).json({ error: "Failed to delete user." });
    }
  });

  app.use("/api/*", (_req, res) => {
    res.status(404).json({ error: "API route not found" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom", // Changed to custom to handle HTML manually
    });

    app.use(express.static(path.resolve(__dirname, "public")));
    app.use(vite.middlewares);

    app.get("*", async (req, res, next) => {
      const url = req.originalUrl;
      if (path.extname(url)) {
        return next();
      }

      try {
        let template = await fs.readFileSync(
          path.resolve(__dirname, "index.html"),
          "utf-8",
        );
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NX-Solution Server running on http://localhost:${PORT}`);
  });
}

startServer();
