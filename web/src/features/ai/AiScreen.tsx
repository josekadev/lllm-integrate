"use client";

import { FormEvent, useState } from "react";

export default function AIPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "qwen2.5-coder:1.5b",
          prompt: `
                    Guarda los datos para que aprendas
                    ${prompt}
                    `,
          stream: false,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Ocurrió un error");
      }

      setResponse(data.response || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white p-6 text-black">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold">IA joseka</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Escribe tu prompt. Ej: crea un componente Button en React con TypeScript"
            className="min-h-[180px] w-full rounded-lg border border-gray-300 p-4 outline-none focus:border-black"
          />

          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
          >
            {loading ? "Consultando..." : "Enviar al modelo"}
          </button>
        </form>
        {error && (
          <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}
        {response && (
          <section className="mt-6">
            <h2 className="mb-2 text-xl font-semibold">Respuesta</h2>
            <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg border border-gray-300 bg-gray-50 p-4 text-sm">
              {response}
            </pre>
          </section>
        )}
      </div>
    </main>
  );
}
