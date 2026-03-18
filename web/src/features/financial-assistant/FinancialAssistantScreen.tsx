"use client";

import { useState } from "react";
import { askAssistant } from "./services/assistant.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FinancialAssistantScreen() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [model, setModel] = useState("");
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    try {
      setLoading(true);
      setResponse("");

      const result = await askAssistant(prompt);

      setResponse(result.response);
      setModel(result.model);
      setTask(result.task);
    } catch (error) {
      setResponse(error instanceof Error ? error.message : "Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-4 bg-amber-200">
      <div>
        <h1 className="text-2xl font-bold ">Asistente financiero</h1>
        <p className="text-sm text-muted-foreground">
          Probá presupuesto, deudas, ahorro e inversión.
        </p>
      </div>

      <div className="space-y-3">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ej: Gano 5.800.000 y pago 870.000 de deuda mensual"
        />

        <Button onClick={handleAsk} disabled={loading}>
          {loading ? "Consultando..." : "Enviar"}
        </Button>
      </div>

      {(task || model) && (
        <div className="rounded-xl border p-4 text-sm">
          <p>
            <strong>Tarea:</strong> {task}
          </p>
          <p>
            <strong>Modelo:</strong> {model}
          </p>
        </div>
      )}

      {response && (
        <div className="rounded-xl border p-4 whitespace-pre-wrap">
          {response}
        </div>
      )}
    </section>
  );
}
