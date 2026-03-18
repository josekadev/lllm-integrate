"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div> Pagina Dashboard</div>
      <Button onClick={() => router.push("/ai")}>Ir a ia</Button>
    </div>
  );
}
