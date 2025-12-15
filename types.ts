export enum DifficultyLevel {
  Beginner = 1,
  Intermediate = 2,
  Advanced = 3,
}

export type Language = 'zh' | 'en';

export interface UserInput {
  ingredients: string;
  time?: string;
  diet?: string;
  tools: string[];
  language: Language;
}

export interface Recipe {
  dish_name: string;
  ingredients: string[];
  difficulty_level: number;
  estimated_time: string;
  steps: string[];
  difficulty_label: string;
  flexible_guidance: string;
  image_prompt: string;
}

export interface GeneratedRecipe extends Recipe {
  id: string; // Internal ID for keys
  imageUrl?: string; // Filled after image generation
  isGeneratingImage: boolean;
}