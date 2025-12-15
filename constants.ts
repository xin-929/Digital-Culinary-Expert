import { Language } from './types';

export const RECIPE_MODEL = 'gemini-2.5-flash';
export const IMAGE_MODEL = 'gemini-2.5-flash-image';

export const DIET_OPTIONS = {
  zh: ['無', '蛋奶素', '全素', '生酮', '低碳', '無麩質'],
  en: ['None', 'Ovo-Lacto Vegetarian', 'Vegan', 'Ketogenic', 'Low Carb', 'Gluten Free']
};

export const TIME_OPTIONS = {
  zh: ['不限', '15 分鐘', '30 分鐘', '45 分鐘', '1 小時以上'],
  en: ['Any', '15 mins', '30 mins', '45 mins', '1 hour+']
};

export const TOOL_OPTIONS = {
  zh: ['平底鍋', '烤箱', '氣炸鍋', '湯鍋', '果汁機', '微波爐', '慢燉鍋'],
  en: ['Pan', 'Oven', 'Air Fryer', 'Pot', 'Blender', 'Microwave', 'Slow Cooker']
};

export const TRANSLATIONS = {
  zh: {
    title: '數位料理專家',
    subtitle: '告訴我你有哪些食材，我將為你創造一道美味佳餚。',
    ingredientsLabel: '現有食材（必填）',
    ingredientsPlaceholder: '例如：雞胸肉、菠菜、大蒜、檸檬...',
    timeLabel: '烹飪時間',
    dietLabel: '飲食偏好',
    toolsLabel: '可用器具 (烹飪方式)',
    submitButton: '生成菜單',
    loading: '思考中...',
    resetButton: '重新開始',
    resultsTitle: '您的專屬菜單',
    footer: '數位料理專家。由 Gemini 提供技術支援。',
    recipe: {
      difficulty: '難度等級',
      time: '預估時間',
      ingredients: '食材清單',
      steps: '烹飪步驟',
      advice: '主廚建議',
      viewDetails: '查看詳情',
      generatingImage: '正在擺盤...',
      imageGenerating: '圖片生成中...',
      shareTitle: '分享食譜摘要',
      copied: '已複製文字',
      close: '關閉',
      more: '還有',
      items: '項...',
      clickToView: '點擊查看完整食譜',
      addToFavorites: '加入收藏',
      removeFromFavorites: '取消收藏',
    },
    error: '暫時無法生成食譜，請稍後再試。'
  },
  en: {
    title: 'Digital Culinary Expert',
    subtitle: 'Tell me what ingredients you have, and I will create a delicious dish for you.',
    ingredientsLabel: 'Ingredients (Required)',
    ingredientsPlaceholder: 'e.g. Chicken breast, Spinach, Garlic, Lemon...',
    timeLabel: 'Cooking Time',
    dietLabel: 'Dietary Preference',
    toolsLabel: 'Available Tools (Cooking Method)',
    submitButton: 'Generate Menu',
    loading: 'Thinking...',
    resetButton: 'Start Over',
    resultsTitle: 'Your Exclusive Menu',
    footer: 'Digital Culinary Expert. Powered by Gemini.',
    recipe: {
      difficulty: 'Difficulty',
      time: 'Est. Time',
      ingredients: 'Ingredients',
      steps: 'Instructions',
      advice: 'Chef\'s Tips',
      viewDetails: 'View Details',
      generatingImage: 'Plating...',
      imageGenerating: 'Generating Image...',
      shareTitle: 'Share Recipe Summary',
      copied: 'Copied',
      close: 'Close',
      more: 'more',
      items: 'items...',
      clickToView: 'Click to view full recipe',
      addToFavorites: 'Add to Favorites',
      removeFromFavorites: 'Remove from Favorites',
    },
    error: 'Unable to generate recipes at the moment. Please try again later.'
  }
};

export const GET_SYSTEM_PROMPT = (lang: Language) => `
你是一位「數位料理專家（Digital Culinary Expert）」
你的任務是根據使用者輸入的食材與條件，分析可行料理、生成結構化食譜菜單，並產出料理完成的模擬圖片描述。

請嚴格遵守以下流程進行分析，但最終只輸出 JSON 格式的結果：

【流程 1｜Input 蒐集】
接收食材清單、時間、飲食偏好、器具。

【流程 2｜食材分析】
分析食材種類，判斷烹調方式，推論 5 道可行料理。

【流程 3 & 4 & 5｜食譜生成與邏輯判斷】
為每道菜生成：
- 菜名 (${lang === 'zh' ? '中文' : '英文'})
- 食材清單 (完整條列，${lang === 'zh' ? '中文' : '英文'})
- 難度等級 (1: 新手, 2: 中等, 3: 進階)
- 難度標籤 (${lang === 'zh' ? '1: 新手友善料理, 2: 中等難度，需要基本技巧, 3: 進階料理，需較多時間與專注' : '1: Beginner Friendly, 2: Intermediate, 3: Advanced'})
- 預估時間 (${lang === 'zh' ? '中文' : '英文'})
- 烹調步驟 (${lang === 'zh' ? '中文' : '英文'})
- 柔性料理建議 (根據難度給予時間和彈性建議，${lang === 'zh' ? '中文' : '英文'})

【流程 6｜模擬圖片 Prompt】
生成 image_prompt:
- 包含菜名 (英文)
- 擺盤風格:
  - 等級 1: 家常、自然、溫暖
  - 等級 2: 簡約、乾淨、現代感
  - 等級 3: 精緻、高級餐廳風格
- 寫實食物攝影、淺景深、良好光線
- Use English for the image prompt to ensure better compatibility with image generation models.
`;