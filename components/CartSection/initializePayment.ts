// export const initializePayment = async (orderData: unknown) => {
//   try {
//     const response = await fetch("/api/initialize", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ orderData }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error || "Failed to initialize payment");
//     }

//     const data = await response.json();

//     // Redirect user to Paystack payment page
//     if (data.data && data.data.authorization_url) {
//       window.location.href = data.data.authorization_url;
//     } else {
//       throw new Error("Authorization URL not received");
//     }
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error("Error initializing payment:", error.message);
//     }
//   }
// };

export type OrderData = {
  email: string;
  total: number;
  [key: string]: unknown; // Add other properties as needed
  userId: string;
};

export const initializePayment = async (orderData: OrderData) => {
  try {
    const response = await fetch("/api/initialize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: orderData.email,
        amount: orderData.total, // Pass the total amount
        metadata: {
          orderDetails: orderData, // Include order details in metadata
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to initialize payment");
    }

    const data = await response.json();

    // Redirect user to Paystack payment page
    if (data.data && data.data.authorization_url) {
      window.location.href = data.data.authorization_url;
    } else {
      throw new Error("Authorization URL not received");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error initializing payment:", error.message);
    }
  }
};
