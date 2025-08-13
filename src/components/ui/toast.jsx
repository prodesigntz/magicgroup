"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// Global toast state
let toastListeners = [];
let toastId = 0;

const ToastContext = React.createContext({
  addToast: () => {},
  removeToast: () => {},
  toasts: []
});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const addToast = React.useCallback((toast) => {
    const id = ++toastId;
    const newToast = { ...toast, id };
    
    setToasts((prev) => [...prev, newToast]);
    
    // Auto remove after duration
    if (toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 5000);
    }
    
    return id;
  }, []);

  const removeToast = React.useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const value = React.useMemo(
    () => ({ addToast, removeToast, toasts }),
    [addToast, removeToast, toasts]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

function ToastViewport() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
}

function Toast({ id, title, description, variant = "default", action, ...props }) {
  const { removeToast } = useToast();

  return (
    <div
      className={cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
        "data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
        {
          "border-red-200 bg-red-50 text-red-900": variant === "destructive",
          "border-green-200 bg-green-50 text-green-900": variant === "success",
          "border-yellow-200 bg-yellow-50 text-yellow-900": variant === "warning",
          "bg-background text-foreground": variant === "default",
        }
      )}
      {...props}
    >
      <div className="grid gap-1">
        {title && (
          <div className="text-sm font-semibold">{title}</div>
        )}
        {description && (
          <div className="text-sm opacity-90">{description}</div>
        )}
      </div>
      {action}
      <button
        className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
        onClick={() => removeToast(id)}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

// Helper hook for toast notifications
export function useToastHelpers() {
  const { addToast } = useToast();
  
  return {
    success: (message, options = {}) => {
      return addToast({
        variant: "success",
        title: "Success",
        description: message,
        ...options,
      });
    },
    error: (message, options = {}) => {
      return addToast({
        variant: "destructive",
        title: "Error",
        description: message,
        ...options,
      });
    },
    warning: (message, options = {}) => {
      return addToast({
        variant: "warning",
        title: "Warning",
        description: message,
        ...options,
      });
    },
    info: (message, options = {}) => {
      return addToast({
        variant: "default",
        title: "Info",
        description: message,
        ...options,
      });
    },
  };
}