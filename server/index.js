import express from "express";
import cors from "cors";
import { OpenRouter } from "@openrouter/sdk";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json({ limit: "2mb" }));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

const openRouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY ?? "",
});

// Сокращённое описание товара
function formatProductShort(p) {
  return `${p.brand} ${p.name} — категория: ${p.category}`;
}

// Список моделей
const MODELS = [
  "x-ai/grok-4.1-fast:free",
  "kwaipilot/kat-coder-pro:free",
  "nvidia/nemotron-nano-12b-v2-vl:free",
  "alibaba/tongyi-deepresearch-30b-a3b:free",
  "openai/gpt-oss-20b:free",
  "google/gemma-3n-e2b-it:free",
];

/**
 * Перебираем модели и отправляем запрос
 */
async function sendAIMessage(messages) {
  for (const model of MODELS) {
    try {
      console.log(`⚙ Trying model: ${model}`);

      const response = await openRouter.chat.send({
        model,
        messages,
      });

      const text =
        response?.choices?.[0]?.message?.content ?? "Модель не вернула текст";

      return { success: true, text };
    } catch (e) {
      const message = String(e);

      if (
        message.includes("429") ||
        message.includes("rate") ||
        message.includes("limit")
      ) {
        console.log(`⚠ Model ${model} rate-limited — switching...`);
        continue;
      }

      if (
        message.includes("ECONNRESET") ||
        message.includes("fetch failed") ||
        message.includes("getaddrinfo") ||
        message.includes("timeout")
      ) {
        return {
          success: false,
          text: "❌ Похоже, что соединение с OpenRouter заблокировано. Возможно выключен VPN.",
        };
      }

      console.log("Model error:", message);
    }
  }

  return {
    success: false,
    text: "❌ Все модели недоступны. Возможно нужен VPN.",
  };
}

app.post("/api/chat", async (req, res) => {
  const { history = [], userMessage = "", products = [] } = req.body;

  const systemMessage = `
Ты — ИИ ассистент магазина электроники.
Отвечай только на вопросы про технику, гаджеты, характеристики, IT и ПО.

ВАЖНО: Используй простое форматирование текста. Избегай сложных таблиц.
Если нужно сравнить товары, используй списки и заголовки.

Если вопрос не относится к технике — отвечай:
"Этот вопрос не относится к технике, поэтому я не могу ответить."

${
  products.length > 0
    ? `Вот доступные товары:\n${products.map(formatProductShort).join("\n")}`
    : `Товары отсутствуют. Спроси пользователя, что ему нужно.`
}`;

  const messages = [
    { role: "system", content: systemMessage },
    ...history,
    { role: "user", content: userMessage },
  ];

  const result = await sendAIMessage(messages);

  if (!result.success) {
    return res.status(503).json({
      error: result.text,
    });
  }

  return res.json({ reply: result.text });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
