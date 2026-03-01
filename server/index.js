import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
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
  }),
);

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 минута
  max: 5, // максимум 5 запросов в минуту с одного IP
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/chat", limiter);

const openRouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY ?? "",
});

const MODELS = [
  "xiaomi/mimo-v2-flash:free",
  "tngtech/deepseek-r1t2-chimera:free",
  "tngtech/deepseek-r1t-chimera:free",
  "deepseek/deepseek-r1-0528:free",
  "google/gemma-3-27b-it:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "openai/gpt-oss-120b:free",
  "nvidia/nemotron-3-nano-30b-a3b:free",
];

async function sendAIMessage(messages) {
  const MAX_RETRIES = 3;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    for (const model of MODELS) {
      try {
        const response = await openRouter.chat.send({
          model,
          messages,
        });

        const text = response?.choices?.[0]?.message?.content ?? "";
        return { success: true, text };
      } catch (e) {
        const message = String(e);

        if (
          message.includes("429") ||
          message.includes("rate") ||
          message.includes("limit")
        ) {
          continue;
        }

        if (
          message.includes("ECONNRESET") ||
          message.includes("fetch failed") ||
          message.includes("timeout")
        ) {
          if (attempt < MAX_RETRIES) {
            await new Promise((r) => setTimeout(r, attempt * 1000));
            continue;
          }

          return {
            success: false,
            text: "❌ Connection error while contacting AI.",
          };
        }
      }
    }
  }

  return {
    success: false,
    text: "❌ AI service temporarily unavailable.",
  };
}

app.post("/api/chat", async (req, res) => {
  const { userMessage = "", products = [] } = req.body;

  const currentDate = new Date().toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const systemMessage = `
ТЕКУЩАЯ ДАТА (ФАКТ):
${currentDate}

Считай, что сейчас именно эта дата.
Запрещено использовать устаревшие формулировки.

Ты — ИИ ассистент интернет-магазина электроники.

Ты должен помогать клиентам с выбором гаджетов, отвечать на их вопросы, которые касаются техники. Если клиент справшивает про гаджет который не продается в магазине, ты должен рассказать про него и предложить схожее устройство из БД магазина. ИСпользуй интернет если можешь для поиска информации об устройствах. 

КРИТИЧЕСКИ ВАЖНО:
Ты можешь возвращать товары ТОЛЬКО из ассортимента ниже.

ПРАВИЛА:
- при сравнении или подборе всегда предлагай аналоги
- если есть рекомендация — товарный блок ОБЯЗАТЕЛЕН

ФОРМАТ ОТВЕТА:

ЧАСТЬ 1 — ТЕКСТ

ЧАСТЬ 2 — ТОВАРНЫЙ БЛОК
В КОНЦЕ ответа:

===PRODUCTS_START===
[ JSON массив ]
===PRODUCTS_END===

Формат товара:
{
  "objectId": string,
  "name": string,
  "brand": string,
  "category": string,
  "price": number
}

Ответ НЕВЕРЕН, если:
- нет PRODUCTS_START / PRODUCTS_END
- JSON невалидный
- возвращён товар не из ассортимента

АССОРТИМЕНТ (JSON):
${JSON.stringify(products, null, 2)}
`.trim();

  const messages = [
    { role: "system", content: systemMessage },
    { role: "user", content: userMessage },
  ];

  const result = await sendAIMessage(messages);

  if (!result.success) {
    return res.status(503).json({ error: result.text });
  }

  return res.json({ reply: result.text });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
