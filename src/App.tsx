import React, { useState, useEffect } from 'react';
import { Calendar, Search, Home } from 'lucide-react';
import Header from './components/Header';
import ExpirationList from './components/ExpirationList';
import RecipeSearch from './components/RecipeSearch';
import CalendarView from './components/CalendarView';
import AddFoodItem from './components/AddFoodItem';
import Notification from './components/Notification';

interface FoodItem {
  id: number;
  name: string;
  expirationDate: Date;
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'calendar' | 'add'>('home');
  const [foodItems, setFoodItems] = useState<FoodItem[]>([
    { id: 1, name: '牛乳', expirationDate: new Date('2024-03-25') },
    { id: 2, name: '卵', expirationDate: new Date('2024-03-28') },
    { id: 3, name: 'パン', expirationDate: new Date('2024-03-22') },
  ]);
  const [notification, setNotification] = useState<string | null>(null);

  const handleAddFood = (name: string, expirationDate: Date) => {
    const newItem: FoodItem = {
      id: foodItems.length + 1,
      name,
      expirationDate,
    };
    setFoodItems([...foodItems, newItem]);
    setActiveTab('home');
  };

  const handleDeleteFood = (id: number) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
  };

  useEffect(() => {
    const checkExpirations = () => {
      const today = new Date();
      const nearlyExpiredItems = foodItems.filter(item => {
        const daysUntilExpiration = Math.ceil((item.expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return daysUntilExpiration <= 3 && daysUntilExpiration > 0;
      });

      if (nearlyExpiredItems.length > 0) {
        setNotification(`${nearlyExpiredItems.length}個の食品の賞味期限が近づいています！`);
      }
    };

    checkExpirations();
    const interval = setInterval(checkExpirations, 60000); // 1分ごとにチェック

    return () => clearInterval(interval);
  }, [foodItems]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <ExpirationList
            foodItems={foodItems}
            onAddClick={() => setActiveTab('add')}
            onDeleteFood={handleDeleteFood}
          />
        )}
        {activeTab === 'search' && <RecipeSearch />}
        {activeTab === 'calendar' && <CalendarView foodItems={foodItems} />}
        {activeTab === 'add' && (
          <AddFoodItem
            onAdd={handleAddFood}
            onCancel={() => setActiveTab('home')}
          />
        )}
      </main>
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <ul className="flex justify-around py-4">
            <li>
              <button
                onClick={() => setActiveTab('home')}
                className={`flex flex-col items-center ${
                  activeTab === 'home' ? 'text-[#C4E296]' : 'text-gray-600'
                }`}
              >
                <Home size={24} />
                <span className="mt-1 text-xs">ホーム</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('search')}
                className={`flex flex-col items-center ${
                  activeTab === 'search' ? 'text-[#C4E296]' : 'text-gray-600'
                }`}
              >
                <Search size={24} />
                <span className="mt-1 text-xs">レシピ検索</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`flex flex-col items-center ${
                  activeTab === 'calendar' ? 'text-[#C4E296]' : 'text-gray-600'
                }`}
              >
                <Calendar size={24} />
                <span className="mt-1 text-xs">カレンダー</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default App;