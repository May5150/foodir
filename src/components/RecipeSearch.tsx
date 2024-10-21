import React from 'react';
import { Search } from 'lucide-react';

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
}

const RecipeSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 模擬APIコール
    const mockRecipes: Recipe[] = [
      { id: 1, name: 'カルボナーラ', ingredients: ['パスタ', '卵', 'ベーコン', 'チーズ'] },
      { id: 2, name: '鶏肉の炒め物', ingredients: ['鶏肉', '野菜', '醤油'] },
      { id: 3, name: '野菜スープ', ingredients: ['野菜', 'スープの素', 'ハーブ'] },
    ];
    setRecipes(mockRecipes.filter(recipe => 
      recipe.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      )
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">レシピ検索</h2>
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex items-center border-2 border-gray-300 rounded-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="材料を入力してください"
            className="flex-grow px-4 py-2 focus:outline-none"
          />
          <button type="submit" className="bg-[#C4E296] text-white p-2 rounded-r-md">
            <Search size={24} />
          </button>
        </div>
      </form>
      <ul className="space-y-4">
        {recipes.map(recipe => (
          <li key={recipe.id} className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-semibold">{recipe.name}</h3>
            <p className="text-sm text-gray-600">
              材料: {recipe.ingredients.join('、')}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeSearch;