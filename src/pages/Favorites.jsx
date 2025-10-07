import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const updateFavorites = () => {
      setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
    };
    
    updateFavorites();
    
    // Listen for storage changes to update favorites in real-time
    window.addEventListener('storage', updateFavorites);
    
    return () => window.removeEventListener('storage', updateFavorites);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
        ❤️ My Favorite Recipes
      </h1>
      {favorites.length === 0 ? (
        <div className="text-center mt-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No favorites yet!</p>
          <p className="text-gray-400 dark:text-gray-500 mt-2">
            Start adding recipes to your favorites from the home page.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map(meal => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
}
