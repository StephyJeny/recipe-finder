import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("chicken");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then(res => res.json())
      .then(data => {
        setRecipes(data.meals || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
        🍲 Recipe Finder
      </h1>
      <SearchBar onSearch={setQuery} />
      
      {loading ? (
        <div className="text-center mt-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Loading recipes...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {recipes.map(meal => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
      
      {!loading && recipes.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
          No recipes found. Try a different search term!
        </p>
      )}
    </div>
  );
}
