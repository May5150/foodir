import React from 'react';
import { Utensils } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-[#C4E296] text-white shadow-lg">
      <div className="container mx-auto px-4 py-6 flex items-center">
        <Utensils size={32} className="mr-4" />
        <h1 className="text-2xl font-bold">フーディー</h1>
      </div>
    </header>
  );
};

export default Header;