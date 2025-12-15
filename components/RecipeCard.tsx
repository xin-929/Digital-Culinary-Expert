import React from 'react';
import { GeneratedRecipe, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface RecipeCardProps {
  recipe: GeneratedRecipe;
  onClick: () => void;
  language: Language;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick, language }) => {
  const t = TRANSLATIONS[language];
  
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-xl border border-stone-100 flex flex-col h-full transform transition-all hover:scale-[1.02] hover:shadow-2xl duration-300 cursor-pointer group"
      role="button"
      aria-label={`View recipe for ${recipe.dish_name}`}
    >
      {/* Image Section */}
      <div className="h-64 bg-stone-100 relative overflow-hidden">
        {recipe.imageUrl ? (
          <img 
            src={recipe.imageUrl} 
            alt={recipe.dish_name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 bg-stone-200 animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 mb-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <span className="text-sm font-medium">{t.recipe.generatingImage}</span>
          </div>
        )}
        
        {/* Hover Overlay with "View Details" */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 z-10">
             <span className="bg-white/95 text-stone-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                {t.recipe.viewDetails}
             </span>
        </div>

        {/* Difficulty Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-stone-800 shadow-sm border border-stone-200 uppercase tracking-wider z-20">
           {t.recipe.difficulty} {recipe.difficulty_level}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 md:p-8 flex-1 flex flex-col">
        <div className="mb-4">
          <h3 className="text-2xl font-serif font-bold text-stone-900 leading-tight mb-2 group-hover:text-orange-600 transition-colors">{recipe.dish_name}</h3>
          <div className="flex items-center gap-4 text-sm text-stone-500">
            <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
                  <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
                </svg>
                {recipe.estimated_time}
            </div>
            <span className="text-stone-300">|</span>
            <span className={
                recipe.difficulty_level === 1 ? 'text-green-600' :
                recipe.difficulty_level === 2 ? 'text-yellow-600' :
                'text-red-600'
            }>
                {recipe.difficulty_label}
            </span>
          </div>
        </div>

        <div className="mb-6">
            <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wide mb-3 border-b border-stone-100 pb-1">{t.recipe.ingredients}</h4>
            <ul className="grid grid-cols-1 gap-1">
                {recipe.ingredients.slice(0, 4).map((ing, idx) => (
                    <li key={idx} className="text-stone-600 text-sm flex items-start gap-2">
                        <span className="text-orange-400 mt-1">•</span>
                        <span className="truncate">{ing}</span>
                    </li>
                ))}
                {recipe.ingredients.length > 4 && (
                    <li className="text-stone-400 text-xs italic pl-4">
                        + {t.recipe.more} {recipe.ingredients.length - 4} {t.recipe.items}
                    </li>
                )}
            </ul>
        </div>

        <div className="mt-auto pt-4 border-t border-stone-50 flex items-center justify-between text-sm text-stone-500">
             <span>{t.recipe.clickToView}</span>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-orange-400 group-hover:translate-x-1 transition-transform">
               <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
             </svg>
        </div>
      </div>
    </div>
  );
};