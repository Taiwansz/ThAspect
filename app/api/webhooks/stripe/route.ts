import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

const verifyStripeSignature = (payload: string, signatureHeader: string, secret: string) => {
  const parts = signatureHeader.split(",");
  const timestamp = parts.find((part) => part.startsWith("t="))?.slice(2);
  const signatures = parts.filter((part) => part.startsWith("v1=")).map((part) => part.slice(3));
  if (!timestamp || signatures.length === 0) return false;

  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(age) || age > 300) return false;

  const expected = createHmac("sha256", secret).update(`${timestamp}.${payload}`).digest("hex");
  const expectedBuffer = Buffer.from(expected, "hex");

  return signatures.some((signature) => {
    try {
      const candidate = Buffer.from(signature, "hex");
      return candidate.length === expectedBuffer.length && timingSafeEqual(candidate, expectedBuffer);
    } catch {
      return false;
    }
  });
};

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook não configurado." }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Assinatura ausente." }, { status: 400 });
  }

  const payload = await request.text();
  if (!verifyStripeSignature(payload, signature, webhookSecret)) {
    return NextResponse.json({ error: "Assinatura inválida." }, { status: 400 });
  }

  const event = JSON.parse(payload) as {
    id?: string;
    type?: string;
    data?: { object?: { id?: string; payment_status?: string; customer_details?: { email?: string } } };
  };

  if (event.type === "checkout.session.completed") {
    console.info(JSON.stringify({
      event: "thaspect.checkout.completed",
      stripeEventId: event.id,
      sessionId: event.data?.object?.id,
      paymentStatus: event.data?.object?.payment_status,
      email: event.data?.object?.customer_details?.email,
    }));
  }

  return NextResponse.json({ received: true });
}
