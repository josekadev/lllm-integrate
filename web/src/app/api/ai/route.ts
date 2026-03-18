import { NextResponse } from "next/server";

type RequestBody = {
  prompt?: string;
};

export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json();
    const prompt = body.prompt;

    console.log("Received prompt:", prompt);

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json(
        { error: "El prompt es requerido" },
        { status: 400 },
      );
    }

    const ollamaResponse = await fetch("http://ollama:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "qwen2.5-coder:1.5b",
        prompt: prompt.trim(),
        stream: false,
      }),
    });

    if (!ollamaResponse.ok) {
      const errorText = await ollamaResponse.text();

      return NextResponse.json(
        {
          error: "Error al consultar Ollama",
          detail: errorText,
        },
        { status: 500 },
      );
    }

    const data = await ollamaResponse.json();

    return NextResponse.json({
      response: data.response ?? "",
      model: data.model ?? "unknown",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error interno del servidor",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
