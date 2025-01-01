import { getGeminiResponse } from "../services/genaiService.js";

export const handleMessage = async (message, model) => {
  try {
    const userMessage = message.content;
    const geminiResponse = await getGeminiResponse(userMessage, model);
    message.reply({
      content: geminiResponse,
    });
  } catch (error) {
    console.log("Error Handling Messages:", error);
    message.reply({
      content: "Sorry, I Encountered Some Error",
    });
  }
};
