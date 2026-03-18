import { OLLAMA_API_URL } from "@/lib/ai/config";

type GenerateParams = {
  model: string;
  prompt: string;
};

type OllamaGenerateResponse = {
  response?: string;
  model?: string;
  thinking?: string;
  error?: string;
};

export async function generateWithOllama({ model, prompt }: GenerateParams) {
  const res = await fetch(`${OLLAMA_API_URL}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      prompt,
      stream: false,
    }),
  });

  let data: OllamaGenerateResponse;

  try {
    data = await res.json();
  } catch (error) {
    throw new Error("Ollama devolvió una respuesta inválida");
  }

  if (!res.ok) {
    throw new Error(data?.error || "Error al consultar Ollama");
  }

  return {
    response: data.response ?? "",
    model: data.model ?? model,
  };
}
