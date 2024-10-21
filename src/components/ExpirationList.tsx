import React from 'react';
import { Trash2, Plus } from 'lucide-react';

interface FoodItem {
  id: number;
  name: string;
  expirationDate: Date;
}

interface ExpirationListProps {
  foodItems: FoodItem[];
  onAddClick: () => void;
  onDeleteFood: (id: number) => void;
}

const ExpirationList: React.FC<ExpirationListProps> = ({ foodItems, onAddClick, onDeleteFood }) => {
  const getDaysUntilExpiration = (date: Date) => {
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">もうすぐ期限切れ</h2>
        <button
          onClick={onAddClick}
          className="bg-[#C4E296] text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus size={20} className="mr-2" />
          食品を追加
        </button>
      </div>
      <ul className="space-y-4">
        {foodItems.map(item => (
          <li key={item.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">
                あと{getDaysUntilExpiration(item.expirationDate)}日
                （{item.expirationDate.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}）
              </p>
            </div>
            <button
              onClick={() => onDeleteFood(item.id)}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpirationList;