import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import ToastContainer from './Toast';
import { useToast } from '../hooks/useToast';
import { createContext, useContext } from 'react';

// Context global pour les toasts
type ToastFn = {
  success: (title: string, message?: string) => void;
  error:   (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info:    (title: string, message?: string) => void;
};

const ToastContext = createContext<ToastFn>({
  success: () => {},
  error:   () => {},
  warning: () => {},
  info:    () => {},
});

export const useAppToast = () => useContext(ToastContext);

export default function Layout() {
  const { toasts, toast, removeToast } = useToast();

  return (
    <ToastContext.Provider value={toast}>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl mx-auto animate-fadeIn">
            <Outlet />
          </div>
        </main>
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    </ToastContext.Provider>
  );
}
