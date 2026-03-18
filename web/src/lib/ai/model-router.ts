import { OLLAMA_GENERAL_MODEL, OLLAMA_ROUTER_MODEL } from "@/lib/ai/config";

export type TaskType = "extract" | "plan" | "investment" | "chat";

export function detectTask(prompt: string): TaskType {
  const text = prompt.toLowerCase();

  if (
    text.includes("invertir") ||
    text.includes("inversión") ||
    text.includes("inversion")
  ) {
    return "investment";
  }

  if (
    text.includes("gano") ||
    text.includes("cobro") ||
    text.includes("sueldo") ||
    text.includes("deuda") ||
    text.includes("presupuesto") ||
    text.includes("pago")
  ) {
    return "plan";
  }

  if (
    text.includes("gasto") ||
    text.includes("compré") ||
    text.includes("compre")
  ) {
    return "extract";
  }

  return "chat";
}

export function getModelForTask(task: TaskType) {
  switch (task) {
    case "extract":
      return OLLAMA_ROUTER_MODEL;
    case "plan":
    case "investment":
    case "chat":
    default:
      return OLLAMA_GENERAL_MODEL;
  }
}
