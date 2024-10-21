import React from 'react';
import { X } from 'lucide-react';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  return (
    <div className="fixed top-4 right-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-sm">{message}</span>
        </div>
        <button onClick={onClose} className="text-yellow-700 hover:text-yellow-900">
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default Notification;