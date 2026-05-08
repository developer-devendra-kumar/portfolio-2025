import { NextResponse } from "next/server";

interface InquiryPayload {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function parseInquiryPayload(value: unknown): InquiryPayload | null {
  if (typeof value !== "object" || value === null) {
    return null;
  }

  const data = value as Record<string, unknown>;
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";

  if (!name || !email || !message || !isValidEmail(email)) {
    return null;
  }

  return {
    name,
    email,
    message,
    company: typeof data.company === "string" ? data.company.trim() : "",
    projectType:
      typeof data.projectType === "string" ? data.projectType.trim() : "",
    budget: typeof data.budget === "string" ? data.budget.trim() : "",
    timeline: typeof data.timeline === "string" ? data.timeline.trim() : "",
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const inquiry = parseInquiryPayload(body);

    if (!inquiry) {
      return NextResponse.json(
        { success: false, message: "Invalid inquiry payload." },
        { status: 400 },
      );
    }

    const webhookUrl = process.env.INQUIRY_WEBHOOK_URL;

    if (!webhookUrl) {
      console.info("Inquiry received (local mode):", {
        ...inquiry,
        receivedAt: new Date().toISOString(),
      });

      return NextResponse.json({
        success: true,
        mode: "local",
        message:
          "Inquiry captured in local mode. Configure INQUIRY_WEBHOOK_URL for external delivery.",
      });
    }

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...inquiry,
        receivedAt: new Date().toISOString(),
      }),
      cache: "no-store",
    });

    if (!webhookResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          message: `Webhook delivery failed with status ${webhookResponse.status}.`,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      mode: "webhook",
      message: "Inquiry submitted successfully.",
    });
  } catch (error) {
    console.error("Inquiry endpoint error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to submit inquiry." },
      { status: 500 },
    );
  }
}
