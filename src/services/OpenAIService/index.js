const API_KEY = "";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

const OpenAIService = async (prompt) => {
  if (API_KEY === "") {
    return "AI_SERVICE_DOWN";
  }
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    return `AI_SERVICE_DOWN: ${response.status}`;
  }

  const data = await response.json();
  return data;
};

export default OpenAIService;
