import { GoogleGenerativeAI } from "@google/generative-ai";

export const startGemini = () => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  return model;
};

export const getGeminiResponse = async (prompt, model) => {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.log("Error with Gemini API: ", error);
    return "Sorry, I couldn't fetch a response right now.";
  }
};
