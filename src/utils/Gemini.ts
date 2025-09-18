import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "./constant";

const gemini = new GoogleGenerativeAI(GEMINI_API_KEY);

export interface GeminiResponse {
  text: string;
}

export const generateContent = async (prompt: string): Promise<string> => {
  try {
    console.log("Sending prompt to Gemini:", prompt);
    const model = gemini.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Gemini response text:", text);
    return text;
  } catch (error) {
    console.error("Detailed Gemini error:", error);
    if (error instanceof Error) {
      throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("Failed to generate content with Gemini API");
  }
};

export default gemini;