// app/api/chat/route.ts (for App Router)
// OR pages/api/chat.ts (for Pages Router)

import { NextRequest, NextResponse } from "next/server";

// Configuration
const BACKEND_API_URL =
  process.env.BACKEND_API_URL || "http://localhost:8000/chat";
const API_TIMEOUT = 30000; // 30 seconds

type Message = {
  role: "user" | "assistant";
  text: string;
  timestamp?: Date;
};

type ChatRequest = {
  messages: Message[];
};

type BackendRequest = {
  question: string;
};

type BackendResponse = {
  reply?: string;
  answer?: string;
  response?: string;
  error?: string;
};

// App Router version (Next.js 13+)
export async function POST(request: NextRequest) {
  try {
    // Parse incoming request
    const body: ChatRequest = await request.json();

    // Validate request
    if (
      !body.messages ||
      !Array.isArray(body.messages) ||
      body.messages.length === 0
    ) {
      return NextResponse.json(
        { error: "Invalid request: messages array is required" },
        { status: 400 }
      );
    }

    // Get the last user message
    const lastUserMessage = [...body.messages]
      .reverse()
      .find((msg) => msg.role === "user");

    if (!lastUserMessage) {
      return NextResponse.json(
        { error: "No user message found" },
        { status: 400 }
      );
    }

    // Prepare request for backend
    const backendRequest: BackendRequest = {
      question: lastUserMessage.text,
    };

    // Call backend API with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    try {
      const response = await fetch(BACKEND_API_URL, {
        method: "POST",
        headers: {
          "x-api-key": process.env.API_SECRET || '',
          "Content-Type": "application/json",
        },
        body: JSON.stringify(backendRequest),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.error(
          `Backend API error: ${response.status} ${response.statusText}`
        );
        return NextResponse.json(
          {
            reply:
              "I'm having trouble connecting to my knowledge base right now. Please try again in a moment! 🔄",
          },
          { status: 200 } // Return 200 to handle gracefully on frontend
        );
      }

      const data: BackendResponse = await response.json();

      // Handle different possible response formats from backend
      const reply = data.reply || data.answer || data.response;

      if (!reply) {
        console.error("Backend returned no reply:", data);
        return NextResponse.json(
          {
            reply:
              "I received an unexpected response. Could you rephrase your question? 🤔",
          },
          { status: 200 }
        );
      }

      return NextResponse.json({ reply });
    } catch (fetchError) {
      clearTimeout(timeoutId);

      if (fetchError instanceof Error && fetchError.name === "AbortError") {
        console.error("Request timeout");
        return NextResponse.json(
          {
            reply:
              "That's taking longer than expected. Please try asking something simpler! ⏱️",
          },
          { status: 200 }
        );
      }

      throw fetchError;
    }
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      {
        reply:
          "Oops! Something went wrong on my end. Mind trying that again? 🤔",
      },
      { status: 200 } // Return 200 to handle gracefully on frontend
    );
  }
}
