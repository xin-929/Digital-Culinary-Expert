import { GoogleGenAI, Type, Schema } from "@google/genai";
import { RECIPE_MODEL, IMAGE_MODEL, GET_SYSTEM_PROMPT } from "../constants";
import { UserInput, Recipe } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema: Schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      dish_name: { type: Type.STRING },
      ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
      difficulty_level: { type: Type.INTEGER },
      difficulty_label: { type: Type.STRING },
      estimated_time: { type: Type.STRING },
      steps: { type: Type.ARRAY, items: { type: Type.STRING } },
      flexible_guidance: { type: Type.STRING },
      image_prompt: { type: Type.STRING },
    },
    required: ["dish_name", "ingredients", "difficulty_level", "difficulty_label", "estimated_time", "steps", "flexible_guidance", "image_prompt"],
  },
};

export const generateRecipes = async (input: UserInput): Promise<Recipe[]> => {
  const prompt = `
    User Input:
    - Ingredients: ${input.ingredients}
    - Time: ${input.time || "Flexible"}
    - Diet: ${input.diet || "None"}
    - Tools: ${input.tools.length > 0 ? input.tools.join(", ") : "Basic Tools"}
    - Language: ${input.language === 'zh' ? 'Traditional Chinese' : 'English'}
    
    Please act as a Digital Culinary Expert and generate 5 different recipes based on these inputs.
    Output strictly in JSON format as per the schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: RECIPE_MODEL,
      contents: prompt,
      config: {
        systemInstruction: GET_SYSTEM_PROMPT(input.language),
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as Recipe[];
  } catch (error) {
    console.error("Error generating recipes:", error);
    throw error;
  }
};

export const generateDishImage = async (imagePrompt: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: IMAGE_MODEL,
      contents: imagePrompt,
      config: {
        // Image generation specific config if needed, though mostly prompt based for flash-image
      }
    });

    // Check for inline data (base64)
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData && part.inlineData.data) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};