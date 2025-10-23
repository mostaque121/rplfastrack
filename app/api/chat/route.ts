// app/api/generate/route.ts

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";

export const runtime = "edge"; // Edge recommended for low-latency streaming
const google = createGoogleGenerativeAI({
  // custom settings
});
export async function POST(req: Request) {
  try {
    const { prompt }: { prompt: string } = await req.json();
    // Construct the full prompt
    const fullPrompt = `
      You are an expert email writing assistant.
      The user's request is: "${prompt}"
      Please apply this request to the following email draft:
      ---
      [Your email draft can be passed in here as well]
      ---
      Return ONLY the new, modified email text.
    `;

    // Request streaming response from Gemini
    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: "You are an expert email writing assistant.",
      prompt: fullPrompt,
    });

    // Return as a streaming response
    return result.toUIMessageStreamResponse();
  } catch (err: any) {
    console.error("Error generating email:", err);
    return new Response("Failed to generate email", { status: 500 });
  }
}
