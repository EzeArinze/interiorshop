import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
      .update(body)
      .digest("hex");

    if (hash !== req.headers.get("x-paystack-signature")) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.event === "charge.success") {
      const { reference, amount, customer } = event.data;

      // Here you would typically update your database and create an order
      console.log("Successful payment:", {
        reference,
        amount: amount / 100, // Convert back to main currency unit
        customer,
      });

      // You can add logic here to create the order in your database
      // For now, we'll just log the data
      console.log("Order data:", event.data);
      const { orderDetails } = event.data.metadata;
      console.log("My Order Details", orderDetails.items);
    }

    return NextResponse.json({ status: "success" });
  } catch (error: unknown) {
    console.error("Error processing webhook:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
