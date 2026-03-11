import { useEffect, useRef, useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

const ICONS = {
  success: CheckCircle,
  error:   XCircle,
  warning: AlertTriangle,
  info:    Info,
};

const STYLES = {
  success: {
    container: 'bg-white border-l-4 border-emerald-500',
    icon:      'text-emerald-500',
    title:     'text-slate-800',
    message:   'text-slate-500',
  },
  error: {
    container: 'bg-white border-l-4 border-rose-500',
    icon:      'text-rose-500',
    title:     'text-slate-800',
    message:   'text-slate-500',
  },
  warning: {
    container: 'bg-white border-l-4 border-amber-500',
    icon:      'text-amber-500',
    title:     'text-slate-800',
    message:   'text-slate-500',
  },
  info: {
    container: 'bg-white border-l-4 border-sky-500',
    icon:      'text-sky-500',
    title:     'text-slate-800',
    message:   'text-slate-500',
  },
};

function ToastItem({ toast, onRemove }: { toast: ToastMessage; onRemove: (id: string) => void }) {
  const [visible, setVisible] = useState(false);
  const Icon = ICONS[toast.type];
  const style = STYLES[toast.type];
  const duration = toast.duration ?? 4000;
  const exitTimerRef = useRef<number | null>(null);

  useEffect(() => {
    // Entrée avec animation
    const enterTimer = window.setTimeout(() => setVisible(true), 10);

    // Sortie automatique (stockée pour pouvoir la mettre en pause au survol)
    exitTimerRef.current = window.setTimeout(() => {
      setVisible(false);
      window.setTimeout(() => onRemove(toast.id), 300);
    }, duration);

    return () => {
      clearTimeout(enterTimer);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, [toast.id, duration, onRemove]);

  return (
    <div
      onMouseEnter={() => {
        if (exitTimerRef.current) { clearTimeout(exitTimerRef.current); exitTimerRef.current = null; }
      }}
      onMouseLeave={() => {
        if (!visible) return;
        exitTimerRef.current = window.setTimeout(() => {
          setVisible(false);
          window.setTimeout(() => onRemove(toast.id), 300);
        }, 1500);
      }}
      className={`
        ${style.container}
        flex items-start gap-3 px-4 py-3.5 rounded-xl shadow-lg
        max-w-sm w-full pointer-events-auto
        transition-all duration-300 ease-out
        ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
      `}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${style.icon}`} />
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold leading-snug ${style.title}`}>{toast.title}</p>
        {toast.message && (
          <p className={`text-xs mt-0.5 leading-relaxed ${style.message}`}>{toast.message}</p>
        )}
      </div>
      <button
        onClick={() => { setVisible(false); setTimeout(() => onRemove(toast.id), 300); }}
        className="text-slate-300 hover:text-slate-500 transition flex-shrink-0 mt-0.5"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function ToastContainer({ toasts, onRemove }: ToastProps) {
  return (
    <div className="toast-container" aria-live="polite" role="status">
      {toasts.map(t => (
        <ToastItem key={t.id} toast={t} onRemove={onRemove} />
      ))}
    </div>
  );
}
