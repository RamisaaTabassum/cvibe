import { useState, useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-purple-600',
  };

  return (
    <div
      className={`fixed bottom-6 right-6 ${styles[type]} text-white
      px-5 py-3 rounded-xl shadow-lg text-sm font-medium z-50
      animate-fade-in flex items-center gap-3`}
    >
      {type === 'success' && '✓'}
      {type === 'error' && '✕'}
      {type === 'info' && 'ℹ'}
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">
        ✕
      </button>
    </div>
  );
};

export default Toast;