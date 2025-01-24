"use server";

import { v4 as uuidv4 } from "uuid";

export async function initiateFlutterwavePayment(
  amount: number,
  email: string,
  name: string,
  location: string,
  city: string,
  items: unknown[]
) {
  try {
    const tx_ref = uuidv4();

    return {
      success: true,
      paymentData: {
        public_key: process.env.FLW_PUBLIC_KEY,
        tx_ref,
        amount,
        currency: "NGN",
        payment_options: "card,banktransfer",
        redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-callback`,
        customer: {
          email,
          name,
        },
        meta: {
          location,
          city,
          items,
        },
        customizations: {
          title: "Your Store Name",
          logo: "https://your-logo-url.com/logo.png",
        },
      },
    };
  } catch (error) {
    console.error("Flutterwave payment error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
