import { TChatMessage } from "../types/chatTypes";

const welcomeMessage: TChatMessage = {
  role: "assistant",
  content:
    "Hello! I'm your AI shopping assistant. I can help you:\n\n• Find products based on your needs\n• Compare different items\n• Provide product recommendations\n• Answer questions about brands and categories\n• Help you make informed purchasing decisions\n\nWhat would you like to know about our products?",
};

export default welcomeMessage;
