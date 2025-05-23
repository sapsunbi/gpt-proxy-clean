import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

console.log("✅ 실제 실행 중인 server.js입니다");
console.log("🧪 모든 환경변수:", process.env);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/gpt", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
      }),
    });

    const data = await response.json();
    res.json({ text: data.choices?.[0]?.message?.content?.trim() || "" });
  } catch (error) {
    console.error("GPT 호출 오류:", error);
    res.status(500).json({ error: "GPT 요청 실패" });
  }
});

const PORT = process.env.PORT || 3001;
console.log("🧪 사용 중인 PORT 값:", PORT);
app.listen(PORT, () => {
  console.log("✅ 실제 실행 중인 server.js입니다");
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});