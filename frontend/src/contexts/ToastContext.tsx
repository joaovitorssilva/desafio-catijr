import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { BsCheckCircleFill, BsXLg } from 'react-icons/bs';

interface Toast {
  message: string;
  type: 'success' | 'error';
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          className={`fixed flex items-center gap-4 top-16 left-1/2 -translate-x-1/2 px-4 py-3 rounded-xl bg-bg border border-white shadow-lg z-100 animate-fadeIn ${
            toast.type === 'success' ? ' text-success' : 'text-danger'
          }`}
        >
          <BsCheckCircleFill/>
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="hover:opacity-70 transition-opacity cursor-pointer"
          >
            <BsXLg />
          </button>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
