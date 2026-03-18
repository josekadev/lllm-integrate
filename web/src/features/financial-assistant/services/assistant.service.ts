export type AskAssistantResponse = {
  response: string;
  model: string;
  task: string;
};

export async function askAssistant(
  prompt: string,
): Promise<AskAssistantResponse> {
  const res = await fetch("/api/assistant", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Error al consultar el asistente");
  }

  return data;
}
