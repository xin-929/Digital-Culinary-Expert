import React, { useState } from 'react';
import { UserInput, Language } from '../types';
import { DIET_OPTIONS, TIME_OPTIONS, TOOL_OPTIONS, TRANSLATIONS } from '../constants';

interface InputFormProps {
  onSubmit: (data: UserInput) => void;
  isLoading: boolean;
  language: Language;
}

const ToolIcon = ({ name }: { name: string }) => {
  // Normalize checking for both EN and ZH
  const is = (zh: string, en: string) => name === zh || name === en;

  // Pan (Frying Pan/Skillet)
  if (is('平底鍋', 'Pan')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
           <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c.828 0 1.5-.672 1.5-1.5v-3c0-.828-.672-1.5-1.5-1.5h-15c-.828 0-1.5.672-1.5 1.5v3c0 .828.672 1.5 1.5 1.5" />
           <path strokeLinecap="round" strokeLinejoin="round" d="M21 9h-6c0 4.97-4.03 9-9 9H5" />
           <path strokeLinecap="round" strokeLinejoin="round" d="M6 18h8a6 6 0 0 0 6-6" />
        </svg>
      );
  }
  
  // Oven (Standard Oven)
  if (is('烤箱', 'Oven')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h12A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 15h16.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 6.75h.75" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 12h3" />
        </svg>
      );
  }

  // Air Fryer (Rounded box with drawer handle)
  if (is('氣炸鍋', 'Air Fryer')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
           <path strokeLinecap="round" strokeLinejoin="round" d="M6 5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v13.5a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V5.25Z" />
           <path strokeLinecap="round" strokeLinejoin="round" d="M9 10.5h6" />
           <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 14.25h3v2.25h-3v-2.25Z" />
           <path strokeLinecap="round" strokeLinejoin="round" d="M6 8.25h12" />
        </svg>
      );
  }

  // Pot (Stockpot)
  if (is('湯鍋', 'Pot')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5m-13.5-12h10.5a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H6.75a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3ZM2.25 9h1.5m16.5 0h1.5" />
        </svg>
      );
  }

  // Blender (Pitcher on base)
  if (is('果汁機', 'Blender')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 4.5h9l-1.5 10.5a3 3 0 0 1-3 3h-3a3 3 0 0 1-3-3L7.5 4.5Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 2.25h6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 18h10.5v3.75H6.75V18Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25h.008v.008H12v-.008Z" />
        </svg>
      );
  }

  // Microwave (Box with side panel)
  if (is('微波爐', 'Microwave')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5v13.5H3.75V5.25Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 5.25v13.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 8.25h7.5v7.5H6v-7.5Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 8.25h.008v.008h-.008V8.25Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 11.25h.008v.008h-.008v-.008Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 14.25h.008v.008h-.008v-.008Z" />
        </svg>
      );
  }

  // Slow Cooker (Oval shape pot with lid handle)
  if (is('慢燉鍋', 'Slow Cooker')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5h15c0 4.142-3.358 7.5-7.5 7.5s-7.5-3.358-7.5-7.5Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5c0-2.485 3.358-4.5 7.5-4.5s7.5 2.015 7.5 4.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12h2.25" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h2.25" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 18v2.25" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 18v2.25" />
        </svg>
      );
  }
  
  // Default (Chef hat)
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
    </svg>
  );
};

const TimeIcon = ({ name }: { name: string }) => {
  if (name.includes('不限') || name.includes('Any')) return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;
  if (name.includes('15')) return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;
  return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;
};

const DietIcon = ({ name }: { name: string }) => {
   const is = (zh: string, en: string) => name === zh || name === en;

   // None (Menu/List - "Everything on the menu")
   if (is('無', 'None')) {
       return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
       );
   }

   // Vegan (Leaf)
   if (is('全素', 'Vegan')) {
       return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
       );
   }

   // Ovo-Lacto (Egg)
   if (is('蛋奶素', 'Ovo-Lacto Vegetarian')) {
       return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-4.97-4.03-9-9-9z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 13.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
        </svg>
       );
   }

   // Keto (Meat/Bone)
   if (is('生酮', 'Ketogenic')) {
       return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m9 14.25 6-6m4.5-3.493V2.146a.375.375 0 0 0-.375-.375H16.42a2.25 2.25 0 0 0-1.536.61l-1.42 1.42a2.25 2.25 0 0 1-1.536.61H5.158a2.25 2.25 0 0 0-2.25 2.25v6.546a2.25 2.25 0 0 0 .61 1.536l1.42 1.42a2.25 2.25 0 0 1 .61 1.536v2.774a.375.375 0 0 0 .375.375h2.613a2.25 2.25 0 0 0 1.536-.61l1.42-1.42a2.25 2.25 0 0 1 1.536-.61h6.774a.375.375 0 0 0 .375-.375v-2.613a2.25 2.25 0 0 0-.61-1.536l-1.42-1.42a2.25 2.25 0 0 1-.61-1.536Z" />
        </svg>
       );
   }

   // Low Carb (Fish)
   if (is('低碳', 'Low Carb')) {
       return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
           <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
       );
   }

   // Gluten Free (Wheat crossed)
   if (is('無麩質', 'Gluten Free')) {
       return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17M4.5 9c2.5-2.5 6-3.5 9.5-1.5M19.5 9c-2.5-2.5-6-3.5-9.5-1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l16 16" />
        </svg>
       );
   }

   // Fallback
   return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" /></svg>;
};

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading, language }) => {
  const [ingredients, setIngredients] = useState('');
  const [time, setTime] = useState('');
  const [diet, setDiet] = useState('');
  const [tools, setTools] = useState<string[]>([]);
  
  const t = TRANSLATIONS[language];
  const dietOptions = DIET_OPTIONS[language];
  const timeOptions = TIME_OPTIONS[language];
  const toolOptions = TOOL_OPTIONS[language];

  // Reset selections when language changes to avoid mismatch, or map them.
  // For simplicity, we keep them but it might look weird if state persists across language switch. 
  // However, since we lift state up in App for language, this component re-renders.
  // The state inside here (time, diet, tools) is local strings.
  // If user switches language, '30 mins' becomes invalid if we strictly check against new options.
  // But for now, let's just let the user re-select or clear if they switch language mid-input.
  // A `useEffect` to clear or map selections on language change would be better, but optional for MVP.

  const handleToolToggle = (tool: string) => {
    setTools(prev => 
      prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredients.trim()) return;
    onSubmit({ ingredients, time, diet, tools, language });
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-stone-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-stone-800 mb-2">{t.title}</h2>
        <p className="text-stone-500">{t.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Ingredients */}
        <div>
          <label htmlFor="ingredients" className="block text-sm font-semibold text-stone-700 mb-2">
            {t.ingredientsLabel}
          </label>
          <textarea
            id="ingredients"
            required
            placeholder={t.ingredientsPlaceholder}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full h-32 p-4 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none text-stone-800 placeholder-stone-400"
          />
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-6">
          {/* Time Selection - Visual Cards */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-3">{t.timeLabel}</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
               {timeOptions.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setTime(opt === time ? '' : opt)}
                    className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 flex flex-col items-center justify-center gap-2 border ${
                      time === opt
                        ? 'bg-orange-50 border-orange-500 text-orange-700 ring-1 ring-orange-500'
                        : 'bg-white border-stone-200 text-stone-600 hover:border-orange-300 hover:bg-orange-50/50'
                    }`}
                  >
                    <TimeIcon name={opt} />
                    <span>{opt}</span>
                  </button>
               ))}
            </div>
          </div>

          {/* Diet Selection - Visual Cards */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-3">{t.dietLabel}</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
               {dietOptions.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setDiet(opt === diet ? '' : opt)}
                    className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 flex flex-col items-center justify-center gap-2 border ${
                      diet === opt
                        ? 'bg-orange-50 border-orange-500 text-orange-700 ring-1 ring-orange-500'
                        : 'bg-white border-stone-200 text-stone-600 hover:border-orange-300 hover:bg-orange-50/50'
                    }`}
                  >
                    <DietIcon name={opt} />
                    <span>{opt}</span>
                  </button>
               ))}
            </div>
          </div>
        </div>

        {/* Tools */}
        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-3">{t.toolsLabel}</label>
          <div className="flex flex-wrap gap-2">
            {toolOptions.map(tool => (
              <button
                key={tool}
                type="button"
                onClick={() => handleToolToggle(tool)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  tools.includes(tool)
                    ? 'bg-orange-500 text-white shadow-md transform scale-105'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <ToolIcon name={tool} />
                {tool}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !ingredients.trim()}
          className="w-full py-4 mt-4 bg-stone-900 text-white text-lg font-bold rounded-xl shadow-lg hover:bg-stone-800 focus:outline-none focus:ring-4 focus:ring-stone-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t.loading}
            </span>
          ) : (
            t.submitButton
          )}
        </button>
      </form>
    </div>
  );
};