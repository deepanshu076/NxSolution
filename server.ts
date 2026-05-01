import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Mock data/endpoints for Phase 1
  app.get("/api/domains", (req, res) => {
    res.json([
      { id: "edu", name: "Education & Campuses", slug: "education" },
      { id: "health", name: "Healthcare & Hospitals", slug: "healthcare" },
      { id: "retail", name: "Retail & Commercial", slug: "retail" },
      { id: "mfg", name: "Manufacturing & Factories", slug: "manufacturing" },
    ]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
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
