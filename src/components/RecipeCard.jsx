import { useState, useEffect } from "react";

export default function RecipeCard({ meal }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favs.some(f => f.idMeal === meal.idMeal));
  }, [meal.idMeal]);

  const toggleFavorite = () => {
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favs.some(f => f.idMeal === meal.idMeal)) {
      favs = favs.filter(f => f.idMeal !== meal.idMeal);
      setIsFavorite(false);
    } else {
      favs.push(meal);
      setIsFavorite(true);
    }
    localStorage.setItem("favorites", JSON.stringify(favs));
    
    // Dispatch storage event for real-time updates
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <img 
        src={meal.strMealThumb} 
        alt={meal.strMeal} 
        className="w-full h-48 object-cover" 
      />
      <div className="p-4">
        <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">
          {meal.strMeal}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {meal.strCategory} • {meal.strArea}
        </p>
        <button
          onClick={toggleFavorite}
          className={`w-full px-3 py-2 rounded-md font-medium transition-colors ${
            isFavorite
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-emerald-500 hover:bg-emerald-600 text-white'
          }`}
        >
          {isFavorite ? '💔 Remove' : '❤️ Favorite'}
        </button>
      </div>
    </div>
  );
}
