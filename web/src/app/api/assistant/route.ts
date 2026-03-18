import { NextResponse } from "next/server";
import { detectTask, getModelForTask } from "@/lib/ai/model-router";
import { generateWithOllama } from "@/lib/ai/ollama-client";

type RequestBody = {
  prompt?: string;
};

function buildPrompt(userPrompt: string) {
  return `
Sos un asistente financiero personal experto en Paraguay.
Respondé SIEMPRE en español.
Usá guaraníes (Gs).
Sé claro, práctico y directo.

Usuario: ${userPrompt}
`;
}

export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json();
    const prompt = body.prompt;

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json(
        { error: "El prompt es requerido" },
        { status: 400 },
      );
    }

    const task = detectTask(prompt);
    const model = getModelForTask(task);
    const finalPrompt = buildPrompt(prompt.trim());

    console.log("Task:", task);
    console.log("Model:", model);

    const result = await generateWithOllama({
      model,
      prompt: finalPrompt,
    });

    return NextResponse.json({
      response: result.response,
      model: result.model,
      task,
    });
  } catch (error) {
    console.error("ERROR EN /api/assistant:", error);

    return NextResponse.json(
      {
        error: "Error interno del servidor",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
