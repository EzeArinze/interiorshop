// import { NextResponse } from "next/server";
// import crypto from "crypto";
// import { client } from "@/sanity/lib/backendClient";

// export async function POST(req: Request) {
//   try {
//     const body = await req.text();
//     const hash = crypto
//       .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
//       .update(body)
//       .digest("hex");

//     if (hash !== req.headers.get("x-paystack-signature")) {
//       return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
//     }

//     const event = JSON.parse(body);

//     if (event.event === "charge.success") {
//       // const { reference, amount, customer } = event.data;

//       // // Here you would typically update your database and create an order
//       // console.log("Successful payment:", {
//       //   reference,
//       //   amount: amount / 100, // Convert back to main currency unit
//       //   customer,
//       // });
//       const { reference, amount, customer, metadata } = event.data;
//       const { orderDetails, userId } = metadata;

//       // Build order data
//       const orderData = {
//         _type: "order",
//         orderNumber: reference,
//         paystackCheckoutSessionId: reference,
//         kindeUserId: userId || "1234567",
//         customerName: orderDetails.fullName,
//         email: customer.email,
//         paystackPaymentIntentId: reference,
//         totalPrice: Number(orderDetails.total),
//         currency: event.data.currency,
//         orderDate: new Date(event.data.paid_at).toISOString(),
//         status: "paid",
//         products: orderDetails.items.map((item: any) => ({
//           _key: item.product._id,
//           product: {
//             _type: "reference",
//             _ref: item.product._id,
//           },
//           quantity: Number(item.quantity),
//         })),
//       };

//       // You can add logic here to create the order in your database
//       // For now, we'll just log the data
//       console.log("Order data:", orderData);
//       // const { orderDetails } = event.data.metadata;
//       // console.log("My Order Details", orderDetails.items);
//       const order = await client.create(orderData);
//       return order;
//     }

//     return NextResponse.json({ status: "success" });
//   } catch (error: unknown) {
//     console.error("Error processing webhook:", error);
//     const errorMessage =
//       error instanceof Error ? error.message : "An error occurred";
//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import crypto from "crypto";
import { client } from "@/sanity/lib/backendClient";

export async function POST(req: Request) {
  try {
    // Read the raw body as text
    const body = await req.text();

    // Verify Paystack signature
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
      .update(body)
      .digest("hex");

    if (hash !== req.headers.get("x-paystack-signature")) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Parse the body
    const event = JSON.parse(body);

    // Handle successful charge event
    if (event.event === "charge.success") {
      const { reference, customer, metadata } = event.data;
      const { orderDetails, userId } = metadata;

      // Build order data
      const orderData = {
        _type: "order",
        orderNumber: reference,
        paystackCheckoutSessionId: reference,
        kindeUserId: userId,
        customerName: orderDetails.fullName,
        email: customer.email,
        paystackPaymentIntentId: reference,
        totalPrice: Number(orderDetails.total),
        currency: event.data.currency,
        orderDate: new Date(event.data.paid_at).toISOString(),
        status: "paid",
        products: orderDetails.items.map(
          (item: { product: { _id: string }; quantity: number }) => ({
            _key: item.product._id,
            product: {
              _type: "reference",
              _ref: item.product._id,
            },
            quantity: Number(item.quantity),
          })
        ),
      };

      // Save the order in Sanity
      const order = await client.create(orderData);

      // Return the created order as a response
      return NextResponse.json({
        status: "success",
        message: "Order created successfully",
        data: order,
      });
    }

    // If the event type is not charge.success, return success response
    return NextResponse.json({ status: "success", message: "Event ignored" });
  } catch (error: unknown) {
    console.error("Error processing webhook:", error);

    // Return error response
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// async function createSanityOrder(order){
//   const orderSet = await client.create(order);
//   return orderSet

// }
