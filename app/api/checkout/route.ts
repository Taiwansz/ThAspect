import { NextResponse } from "next/server";
import { PRODUCTS, VALID_COUPONS } from "@/data/products";

type CheckoutItem = {
  productId: string;
  selectedSize: string;
  quantity: number;
};

type CheckoutPayload = {
  items?: CheckoutItem[];
  couponCode?: string;
};

export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "Checkout seguro ainda não foi conectado ao provedor de pagamentos." },
      { status: 503 }
    );
  }

  let payload: CheckoutPayload;
  try {
    payload = (await request.json()) as CheckoutPayload;
  } catch {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  const inputItems = Array.isArray(payload.items) ? payload.items : [];
  const validItems = inputItems
    .map((item) => {
      const product = PRODUCTS.find((candidate) => candidate.id === item.productId);
      const quantity = Math.max(1, Math.min(10, Number(item.quantity) || 1));
      const size = String(item.selectedSize || "");
      if (!product || !product.sizes.includes(size)) return null;
      return { product, quantity, size };
    })
    .filter(Boolean) as Array<{ product: (typeof PRODUCTS)[number]; quantity: number; size: string }>;

  if (validItems.length === 0) {
    return NextResponse.json({ error: "Sua sacola está vazia ou contém itens inválidos." }, { status: 400 });
  }

  const couponKey = String(payload.couponCode || "").trim().toUpperCase();
  const discountPercent = couponKey && VALID_COUPONS[couponKey] ? VALID_COUPONS[couponKey].discountPercent : 0;
  const subtotal = validItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 350 ? 0 : 25;

  const form = new URLSearchParams();
  form.set("mode", "payment");
  form.set("success_url", `${process.env.NEXT_PUBLIC_APP_URL || "https://thaspect.vercel.app"}/pedido/sucesso?session_id={CHECKOUT_SESSION_ID}`);
  form.set("cancel_url", `${process.env.NEXT_PUBLIC_APP_URL || "https://thaspect.vercel.app"}/#catalogo`);
  form.set("locale", "pt-BR");
  form.set("billing_address_collection", "required");
  form.set("shipping_address_collection[allowed_countries][0]", "BR");
  form.set("phone_number_collection[enabled]", "true");
  form.set("allow_promotion_codes", "true");

  validItems.forEach((item, index) => {
    const discountedUnit = Math.round(item.product.price * (1 - discountPercent / 100) * 100);
    form.set(`line_items[${index}][price_data][currency]`, "brl");
    form.set(`line_items[${index}][price_data][unit_amount]`, String(discountedUnit));
    form.set(`line_items[${index}][price_data][product_data][name]`, item.product.name);
    form.set(`line_items[${index}][price_data][product_data][description]`, `${item.product.collection} · Tamanho ${item.size}`);
    form.set(`line_items[${index}][quantity]`, String(item.quantity));
  });

  if (shipping > 0) {
    const index = validItems.length;
    form.set(`line_items[${index}][price_data][currency]`, "brl");
    form.set(`line_items[${index}][price_data][unit_amount]`, String(shipping * 100));
    form.set(`line_items[${index}][price_data][product_data][name]`, "Frete ThAspect");
    form.set(`line_items[${index}][quantity]`, "1");
  }

  if (couponKey) form.set("metadata[coupon]", couponKey);
  form.set("metadata[brand]", "ThAspect");

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form.toString(),
  });

  const data = (await response.json()) as { url?: string; error?: { message?: string } };

  if (!response.ok || !data.url) {
    console.error("Stripe checkout error", data.error?.message || response.statusText);
    return NextResponse.json(
      { error: data.error?.message || "Não foi possível iniciar o pagamento." },
      { status: 502 }
    );
  }

  return NextResponse.json({ url: data.url });
}
