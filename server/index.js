import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { OpenRouter } from "@openrouter/sdk";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.set("trust proxy", 1);

app.use(express.json({ limit: "2mb" }));

const allowedOrigins = [
  "http://localhost:5173",
  "https://cyber-ai-shop.vercel.app",
  "https://www.cyber-ai-shop.vercel.app",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy violation"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.get("/", (_, res) => {
  res.json({
    status: "ok",
    service: "Cyber AI",
  });
});

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests. Try again in a minute.",
  },
});

app.use("/api/chat", limiter);

const openRouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY ?? "",
});

const MODELS = [
  "meta-llama/llama-3.3-70b-instruct:free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "google/gemma-4-26b-a4b-it:free",
  "google/gemma-4-26b-a4b-it:free",
  "openai/gpt-oss-120b:free",
  "openai/gpt-oss-20b:free",
  "nousresearch/hermes-3-llama-3.1-405b:free",
  "liquid/lfm-2.5-1.2b-thinking:free",
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

        const text = response?.choices?.[0]?.message?.content?.trim() ?? "";

        if (text) {
          return {
            success: true,
            text,
          };
        }
      } catch (error) {
        const message = String(error);

        console.error(`[${model}]`, message);

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
            await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
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
  try {
    const { userMessage = "", products = [] } = req.body;

    if (!userMessage.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const currentDate = new Date().toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const systemMessage = `

ТЕКУЩАЯ ДАТА:
${currentDate}

Ты — ИИ-консультант интернет-магазина электроники.

Твои задачи:

* помогать с выбором техники;
* отвечать на вопросы о гаджетах;
* сравнивать устройства;
* рекомендовать аналоги из ассортимента магазина.

ВАЖНО:
Ты можешь рекомендовать товары ТОЛЬКО из списка ниже.

Если рекомендуешь товар — обязательно добавляй товарный блок.

Формат ответа:

===PRODUCTS_START===
[JSON массив]
===PRODUCTS_END===

Формат товара:
{
"objectId": string,
"name": string,
"brand": string,
"category": string,
"price": number
}

Ассортимент магазина:

${JSON.stringify(products, null, 2)}
`.trim();

    const messages = [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: userMessage,
      },
    ];

    const result = await sendAIMessage(messages);

    if (!result.success) {
      return res.status(503).json({
        error: result.text,
      });
    }

    return res.json({
      reply: result.text,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
