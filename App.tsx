import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { RecipeCard } from './components/RecipeCard';
import { RecipeModal } from './components/RecipeModal';
import { generateRecipes, generateDishImage } from './services/geminiService';
import { UserInput, GeneratedRecipe, Language } from './types';
import { TRANSLATIONS } from './constants';

function App() {
  const [recipes, setRecipes] = useState<GeneratedRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'input' | 'results'>('input');
  const [selectedRecipe, setSelectedRecipe] = useState<GeneratedRecipe | null>(null);
  const [language, setLanguage] = useState<Language>('zh');

  const t = TRANSLATIONS[language];
  
  // Initialize favorite IDs from localStorage
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favoriteRecipeIds');
      try {
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        console.error("Failed to parse favorites", e);
        return [];
      }
    }
    return [];
  });

  // Trigger image generation whenever recipes are updated (and don't have images yet)
  useEffect(() => {
    recipes.forEach(async (recipe) => {
      if (!recipe.imageUrl && !recipe.isGeneratingImage) {
        // Mark as generating to prevent double calls
        setRecipes(prev => prev.map(r => r.id === recipe.id ? { ...r, isGeneratingImage: true } : r));
        
        const imageUrl = await generateDishImage(recipe.image_prompt);
        
        if (imageUrl) {
            setRecipes(prev => prev.map(r => 
                r.id === recipe.id ? { ...r, imageUrl, isGeneratingImage: false } : r
            ));
        } else {
            setRecipes(prev => prev.map(r => 
                r.id === recipe.id ? { ...r, isGeneratingImage: false } : r
            ));
        }
      }
    });
  }, [recipes]);

  const handleFormSubmit = async (input: UserInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedData = await generateRecipes({ ...input, language });
      
      const newRecipes: GeneratedRecipe[] = generatedData.map((r, index) => ({
        ...r,
        id: `recipe-${Date.now()}-${index}`,
        isGeneratingImage: false
      }));

      setRecipes(newRecipes);
      setView('results');
    } catch (err: any) {
      setError(t.error);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setRecipes([]);
    setView('input');
    setError(null);
    setSelectedRecipe(null);
  };

  const toggleFavorite = (recipeId: string) => {
    setFavoriteIds(prev => {
      const newIds = prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId];
      
      localStorage.setItem('favoriteRecipeIds', JSON.stringify(newIds));
      return newIds;
    });
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header language={language} setLanguage={setLanguage} />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {view === 'input' ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in-up">
             <InputForm onSubmit={handleFormSubmit} isLoading={isLoading} language={language} />
             {error && (
               <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 max-w-lg text-center">
                 {error}
               </div>
             )}
          </div>
        ) : (
          <div className="animate-fade-in">
             <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800">{t.resultsTitle}</h2>
                <button 
                  onClick={handleReset}
                  className="px-6 py-2 bg-white border border-stone-200 text-stone-600 font-medium rounded-full shadow-sm hover:bg-stone-50 hover:text-orange-600 transition-colors"
                >
                  {t.resetButton}
                </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
               {recipes.map(recipe => (
                 <RecipeCard 
                   key={recipe.id} 
                   recipe={recipe} 
                   onClick={() => setSelectedRecipe(recipe)}
                   language={language}
                 />
               ))}
             </div>
          </div>
        )}
      </main>

      <footer className="bg-stone-100 border-t border-stone-200 py-8 text-center text-stone-500 text-sm">
        <p>&copy; {new Date().getFullYear()} {t.footer}</p>
      </footer>

      {/* Detail Modal */}
      {selectedRecipe && (
        <RecipeModal 
          recipe={selectedRecipe} 
          onClose={() => setSelectedRecipe(null)}
          isFavorite={favoriteIds.includes(selectedRecipe.id)}
          onToggleFavorite={() => toggleFavorite(selectedRecipe.id)}
          language={language}
        />
      )}
    </div>
  );
}

export default App;