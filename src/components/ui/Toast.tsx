import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
} from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info";

type ToastInput = {
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
};

type ToastItem = ToastInput & {
  id: string;
  type: ToastType;
  duration: number;
};

type ToastContextValue = {
  toast: (toast: ToastInput) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const toastIcons: Record<ToastType, React.ComponentType<{ size?: number }>> = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

function ToastCard({
  toastItem,
  onDismiss,
}: {
  toastItem: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const Icon = toastIcons[toastItem.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-brand-black text-pure-white shadow-2xl shadow-black/20"
    >
      <div className="flex gap-3 p-4">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
          <Icon size={18} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <p className="text-sm font-bold leading-5">{toastItem.title}</p>
              {toastItem.description ? (
                <p className="mt-1 text-sm leading-5 text-white/65">
                  {toastItem.description}
                </p>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => onDismiss(toastItem.id)}
              className="rounded-lg p-1 text-white/45 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Dismiss toast"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`h-1 w-full ${
          toastItem.type === "success"
            ? "bg-emerald-400"
            : toastItem.type === "error"
              ? "bg-red-500"
              : toastItem.type === "warning"
                ? "bg-amber-400"
                : "bg-sky-400"
        }`}
      />
    </motion.div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback(
    ({ duration = 4000, type = "info", ...input }: ToastInput) => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      const nextToast: ToastItem = { id, type, duration, ...input };

      setToasts((current) => [nextToast, ...current].slice(0, 4));

      window.setTimeout(() => {
        dismiss(id);
      }, duration);
    },
    [dismiss],
  );

  const success = useCallback(
    (title: string, description?: string) =>
      toast({ title, description, type: "success" }),
    [toast],
  );

  const error = useCallback(
    (title: string, description?: string) =>
      toast({ title, description, type: "error" }),
    [toast],
  );

  const warning = useCallback(
    (title: string, description?: string) =>
      toast({ title, description, type: "warning" }),
    [toast],
  );

  const info = useCallback(
    (title: string, description?: string) =>
      toast({ title, description, type: "info" }),
    [toast],
  );

  useEffect(() => {
    return () => {
      setToasts([]);
    };
  }, []);

  const value = useMemo(
    () => ({ toast, success, error, warning, info }),
    [toast, success, error, warning, info],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-100 flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:top-6">
        <AnimatePresence initial={false}>
          {toasts.map((toastItem) => (
            <React.Fragment key={toastItem.id}>
              <ToastCard toastItem={toastItem} onDismiss={dismiss} />
            </React.Fragment>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}
