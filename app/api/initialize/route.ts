// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { email, amount, metadata } = body;

//     const response = await fetch(`${process.env.PAYSTACT_INITIALIZE_URI}`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email,
//         amount: Math.round(Number.parseFloat(amount) * 100), // Convert to kobo
//         metadata, // Pass metadata to Paystack
//         callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/paystack/callback`,
//       }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || "Failed to initialize payment");
//     }

//     return NextResponse.json(data);
//   } catch (error: unknown) {
//     console.error("Error initializing Paystack payment:", error);
//     const errorMessage =
//       error instanceof Error ? error.message : "An error occurred";
//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, amount, metadata } = body;

    if (!email || !amount) {
      return NextResponse.json(
        { error: "Email and amount are required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${process.env.PAYSTACT_INITIALIZE_URI}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: Math.round(Number.parseFloat(amount) * 100), // Convert to kobo
        metadata,
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/paystack/callback`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `${response.status}: ${data.message || "Failed to initialize payment"}`
      );
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Error initializing Paystack payment:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
