import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/src/lib/AuthContext";
import { Mail, Lock, ArrowRight, User, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export default function Signup() {
  const [formData, setBaseFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const { signup, user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(user.role === "admin" ? "/admin" : "/dashboard", {
        replace: true,
      });
    }
  }, [navigate, user]);

  const validate = () => {
    const nextErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!formData.name.trim()) nextErrors.name = "Full name is required.";

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (formData.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setValidationErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSuccessMessage("");

    if (!validate()) return;

    try {
      setIsSubmitting(true);
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        isAdmin: formData.isAdmin,
      });
      setSuccessMessage("Check your email to verify your account.");
    } catch (error) {
      const maybeError = error as { status?: number; message?: string };
      if (maybeError?.status === 429) {
        setSubmitError(
          "Email rate limit exceeded. Please wait a few minutes before trying again.",
        );
        console.error("[Signup] Rate limit hit", {
          status: maybeError.status,
          message: maybeError.message,
        });
        return;
      }

      console.error("[Signup] Submit failed", {
        status: maybeError?.status,
        message: maybeError?.message,
        error,
      });
      setSubmitError(
        error instanceof Error ? error.message : "Unable to create account.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pure-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-pure-white pt-20 pb-0">
      {/* ── LEFT PANEL ── */}
      <div className="hidden md:flex md:w-1/2 bg-brand-black relative p-16 flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 opacity-20 grid-bg" />

        {/* Animated Visual */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 400 600">
            <circle
              cx="200"
              cy="300"
              r="100"
              stroke="var(--color-accent-sky)"
              strokeWidth="0.5"
              fill="none"
              opacity="0.2"
            />
            <circle
              cx="200"
              cy="300"
              r="150"
              stroke="var(--color-accent-sky)"
              strokeWidth="0.5"
              fill="none"
              opacity="0.1"
            />
          </svg>
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-brand-black via-brand-black/60 to-transparent" />

        <div className="relative z-10 max-w-sm">
          <div className="text-accent-teal text-[10px] font-bold tracking-[.3em] uppercase mb-4 px-4 py-1.5 rounded-full glass-morphism w-fit border border-accent-teal/20">
            Join the Platform
          </div>
          <h1 className="text-4xl font-display font-bold text-pure-white mb-4 leading-tight">
            Create your account in 60 seconds
          </h1>
          <p className="text-pure-white/40 text-sm leading-relaxed">
            Get access to enquiries, quotes, and project tracking.
          </p>

          <div className="mt-12 space-y-4">
            {[
              "Industry Insights",
              "Live Project Status",
              "Priority Support",
            ].map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-xs text-pure-white/60"
              >
                <CheckCircle2 size={16} className="text-accent-teal" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-display font-bold text-slate-blue mb-2">
              Create account
            </h2>
            <p className="text-slate-blue/40 text-sm">
              Already have one?{" "}
              <Link
                to="/login"
                className="text-brand-walnut font-bold hover:underline"
              >
                Login instead
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {(submitError || successMessage) && (
              <div
                className={`rounded-2xl border px-4 py-3 text-sm ${submitError ? "border-red-200 bg-red-50 text-red-700" : "border-green-200 bg-green-50 text-green-700"}`}
              >
                {submitError || successMessage}
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold text-slate-blue/40 uppercase tracking-widest mb-2 px-1">
                Full name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-5 py-3.5 bg-light-gray rounded-xl border border-cool-gray/50 focus:border-brand-walnut focus:bg-pure-white outline-none transition-all text-sm"
                  value={formData.name}
                  onChange={(e) => {
                    setBaseFormData({ ...formData, name: e.target.value });
                    setValidationErrors((current) => ({
                      ...current,
                      name: undefined,
                    }));
                  }}
                  required
                />
                <User
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-blue/20"
                />
              </div>
              {validationErrors.name && (
                <p className="mt-2 text-xs text-red-600 px-1">
                  {validationErrors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-blue/40 uppercase tracking-widest mb-2 px-1">
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-5 py-3.5 bg-light-gray rounded-xl border border-cool-gray/50 focus:border-brand-walnut focus:bg-pure-white outline-none transition-all text-sm"
                  value={formData.email}
                  onChange={(e) => {
                    setBaseFormData({ ...formData, email: e.target.value });
                    setValidationErrors((current) => ({
                      ...current,
                      email: undefined,
                    }));
                  }}
                  required
                />
                <Mail
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-blue/20"
                />
              </div>
              {validationErrors.email && (
                <p className="mt-2 text-xs text-red-600 px-1">
                  {validationErrors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-blue/40 uppercase tracking-widest mb-2 px-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Min. 8 characters"
                  className="w-full px-5 py-3.5 bg-light-gray rounded-xl border border-cool-gray/50 focus:border-brand-walnut focus:bg-pure-white outline-none transition-all text-sm"
                  value={formData.password}
                  onChange={(e) => {
                    setBaseFormData({ ...formData, password: e.target.value });
                    setValidationErrors((current) => ({
                      ...current,
                      password: undefined,
                    }));
                  }}
                  required
                />
                <Lock
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-blue/20"
                />
              </div>
              {validationErrors.password && (
                <p className="mt-2 text-xs text-red-600 px-1">
                  {validationErrors.password}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-blue/40 uppercase tracking-widest mb-2 px-1">
                Confirm password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Re-enter password"
                  className="w-full px-5 py-3.5 bg-light-gray rounded-xl border border-cool-gray/50 focus:border-brand-walnut focus:bg-pure-white outline-none transition-all text-sm"
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setBaseFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    });
                    setValidationErrors((current) => ({
                      ...current,
                      confirmPassword: undefined,
                    }));
                  }}
                  required
                />
                <Lock
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-blue/20"
                />
              </div>
              {validationErrors.confirmPassword && (
                <p className="mt-2 text-xs text-red-600 px-1">
                  {validationErrors.confirmPassword}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-brand-walnut/5 border border-brand-walnut/20 p-3 mb-2">
              <input
                type="checkbox"
                id="isAdmin"
                checked={formData.isAdmin}
                onChange={(e) => {
                  setBaseFormData({ ...formData, isAdmin: e.target.checked });
                }}
                className="w-4 h-4 rounded cursor-pointer accent-brand-walnut"
              />
              <label
                htmlFor="isAdmin"
                className="text-sm text-slate-blue cursor-pointer flex-1"
              >
                <span className="font-bold">Register as Admin</span>
                <span className="text-xs text-slate-blue/60 block">
                  Access all admin features and manage the platform
                </span>
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full py-4 bg-slate-blue text-pure-white rounded-2xl font-bold transition-all hover:bg-brand-black shadow-xl shadow-slate-blue/10 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting || isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  <>
                    Create account & verify email <ArrowRight size={18} />
                  </>
                )}
              </button>
              <p className="mt-4 text-[10px] text-slate-blue/30 text-center font-medium leading-relaxed">
                Signup → email verification → login → dashboard
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
