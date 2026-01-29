/**
 * API Route pour le chat avec Claude
 * Fichier: app/api/chat/route.ts
 */

import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { MAX_SYSTEM_PROMPT } from "@/lib/prompts";

// Edge runtime pour de meilleures performances
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Validation basique
    if (!messages || !Array.isArray(messages)) {
      return new Response("Messages requis", { status: 400 });
    }

    // Appel Claude avec Vercel AI SDK
    const result = streamText({
      model: anthropic("claude-3-5-sonnet-20241022"),
      system: MAX_SYSTEM_PROMPT,
      messages,
      maxTokens: 500, // Réponses courtes
      temperature: 0.7, // Un peu de créativité
    });

    // Stream la réponse
    return result.toDataStreamResponse();

  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Erreur serveur", { status: 500 });
  }
}
