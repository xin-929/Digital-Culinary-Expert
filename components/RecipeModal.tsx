import React, { useEffect, useState } from 'react';
import { GeneratedRecipe, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface RecipeModalProps {
  recipe: GeneratedRecipe;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  language: Language;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose, isFavorite, onToggleFavorite, language }) => {
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);
  const t = TRANSLATIONS[language];

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleShare = async () => {
    const textToShare = `🍳 ${recipe.dish_name}
⏱️ ${recipe.estimated_time} | 📊 ${t.recipe.difficulty} ${recipe.difficulty_level}

🛒 ${t.recipe.ingredients}:
${recipe.ingredients.map(ing => `• ${ing}`).join('\n')}

👨‍🍳 ${t.recipe.steps}:
${recipe.steps.map((step, idx) => `${idx + 1}. ${step}`).join('\n')}

💡 ${t.recipe.advice}:
${recipe.flexible_guidance}

—— ${t.title}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.dish_name,
          text: textToShare,
        });
      } catch (err) {
        // User cancelled or share failed, ignore
        console.debug('Share cancelled');
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(textToShare);
        setShowCopyFeedback(true);
        setTimeout(() => setShowCopyFeedback(false), 2000);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    }
  };

  if (!recipe) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity animate-fade-in" 
        onClick={onClose}
      ></div>
      
      <div 
        className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-scale-in"
      >
        {/* Actions Container */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          {/* Favorite Button */}
          <button 
            onClick={onToggleFavorite}
            className={`p-2 rounded-full transition-all backdrop-blur-md group relative ${
                isFavorite 
                ? 'bg-rose-500/90 text-white hover:bg-rose-600' 
                : 'bg-black/20 text-white hover:bg-black/40'
            }`}
            title={isFavorite ? t.recipe.removeFromFavorites : t.recipe.addToFavorites}
          >
             <svg xmlns="http://www.w3.org/2000/svg" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`size-6 transition-transform ${isFavorite ? 'scale-110' : ''}`}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
             </svg>
          </button>

          {/* Share Button */}
          <button 
            onClick={handleShare}
            className="p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-all backdrop-blur-md group relative"
            title={t.recipe.shareTitle}
          >
            {showCopyFeedback ? (
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6 text-green-400">
                 <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
               </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
              </svg>
            )}
            
            {/* Tooltip for clipboard feedback */}
            {showCopyFeedback && (
                <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-stone-800 text-white text-xs rounded whitespace-nowrap animate-fade-in shadow-lg">
                    {t.recipe.copied}
                </span>
            )}
          </button>

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-md"
            title={t.recipe.close}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Image Side */}
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-stone-100 relative shrink-0 group">
          {recipe.imageUrl ? (
            <img 
              src={recipe.imageUrl} 
              alt={recipe.dish_name} 
              className="w-full h-full object-cover" 
            />
          ) : (
             <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 bg-stone-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12 mb-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <span className="text-sm font-medium">{t.recipe.imageGenerating}</span>
             </div>
          )}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-white/95 backdrop-blur rounded-full text-xs font-bold text-stone-800 uppercase tracking-wider shadow-sm border border-stone-200">
               {t.recipe.difficulty} {recipe.difficulty_level}
            </span>
            <span className="px-3 py-1 bg-white/95 backdrop-blur rounded-full text-xs font-bold text-stone-800 shadow-sm flex items-center gap-1 border border-stone-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-3.5 text-stone-500">
                  <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
                </svg>
                {recipe.estimated_time}
            </span>
          </div>
        </div>

        {/* Content Side */}
        <div className="w-full md:w-1/2 flex flex-col overflow-y-auto p-6 md:p-10 md:max-h-[90vh]">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-2 leading-tight">
            {recipe.dish_name}
          </h2>
          <div className="mb-8">
             <span className={`inline-block text-sm font-medium ${
                recipe.difficulty_level === 1 ? 'text-green-700' :
                recipe.difficulty_level === 2 ? 'text-yellow-700' :
                'text-red-700'
            }`}>
                {recipe.difficulty_label}
            </span>
          </div>

          <div className="space-y-8">
            {/* Ingredients */}
            <div>
              <h3 className="flex items-center gap-2 text-sm font-bold text-stone-900 uppercase tracking-wide mb-4 border-b border-stone-100 pb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-orange-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12.632A2.25 2.25 0 0 1 18.636 22.5H5.364a2.25 2.25 0 0 1-2.25-2.25L5.354 4.5l.39-.52a2.625 2.625 0 0 0 .195-2.913c-.24-.457-.06-.952.174-1.272a2.247 2.247 0 0 1 2.914-.56 2.253 2.253 0 0 1 1.05 1.543c.092.658.625 1.146 1.292 1.146h4.5c.666 0 1.2-.488 1.291-1.146a2.253 2.253 0 0 1 1.05-1.543c.49-.267 1.1-.2 1.488.17.348.33.61.858.336 1.34a2.624 2.624 0 0 0 .148 2.82l.43.575Z" />
                </svg>
                {t.recipe.ingredients}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {recipe.ingredients.map((ing, idx) => (
                    <li key={idx} className="text-stone-700 text-sm md:text-base flex items-start gap-2.5 p-2 bg-stone-50 rounded-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0"></span>
                        {ing}
                    </li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div>
              <h3 className="flex items-center gap-2 text-sm font-bold text-stone-900 uppercase tracking-wide mb-4 border-b border-stone-100 pb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-orange-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                </svg>
                {t.recipe.steps}
              </h3>
              <div className="space-y-4">
                {recipe.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-4 group">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 text-sm font-bold flex items-center justify-center mt-0.5 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                          {idx + 1}
                        </span>
                        <p className="text-stone-600 text-sm md:text-base leading-relaxed pt-1">{step}</p>
                    </div>
                ))}
              </div>
            </div>

            {/* Advice */}
            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 mt-auto">
                <div className="flex gap-4">
                    <div className="p-2 bg-white rounded-full shadow-sm h-fit text-orange-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 2.625a3.375 3.375 0 0 0-1.5-3.049 19.535 19.535 0 0 0-4.5 0 3.375 3.375 0 0 0-1.5 3.049l-.244 3.109a.75.75 0 0 0 .532.813 9.045 9.045 0 0 0 3.97.234 9.045 9.045 0 0 0 3.97-.234.75.75 0 0 0 .532-.813l-.244-3.109ZM6.375 7.5a4.875 4.875 0 0 1 9.75 0v3a3 3 0 0 1-6 0v-3a1.5 1.5 0 0 0-3 0v3a1.5 1.5 0 0 0 1.5 1.5h6a4.5 4.5 0 0 0 4.5-4.5v-3a6.375 6.375 0 0 0-12.75 0v3a4.5 4.5 0 0 0 1.183 3.045" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-orange-900 uppercase mb-1">{t.recipe.advice}</p>
                        <p className="text-stone-700 italic text-sm md:text-base">{recipe.flexible_guidance}</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};