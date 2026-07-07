import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useAppContext();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border min-w-[300px] max-w-md ${
              toast.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-900/50 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200' :
              toast.type === 'error' ? 'bg-rose-50 dark:bg-rose-900/50 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200' :
              toast.type === 'warning' ? 'bg-amber-50 dark:bg-amber-900/50 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200' :
              'bg-blue-50 dark:bg-blue-900/50 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200'
            }`}
          >
            <div className="flex-shrink-0">
              {toast.type === 'success' && <CheckCircle size={20} className="text-emerald-500" />}
              {toast.type === 'error' && <AlertCircle size={20} className="text-rose-500" />}
              {toast.type === 'warning' && <AlertTriangle size={20} className="text-amber-500" />}
              {toast.type === 'info' && <Info size={20} className="text-blue-500" />}
            </div>
            <div className="flex-1 text-sm font-medium">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 ml-2 p-1 rounded-md opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
