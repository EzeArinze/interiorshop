import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function fetchOrders(userId: string) {
  const GET_ORDER = defineQuery(
    `*[_type == "order" && kindeUserId == $userId] | order(orderDate desc) {
    _id,
    orderNumber,
    paystackCheckoutSessionId,
    kindeUserId,
    customerName,
    email,
    paystackPaymentIntentId,
    products[] {
      product-> {
        _id,
        name,
        price,
        currency,
        "imageUrl": images[0].asset->url
      },
      quantity
    },
    totalPrice,
    currency,
    status,
    orderDate
  }
`
  );

  try {
    const order = await sanityFetch({
      query: GET_ORDER,
      params: { userId },
    });

    return order.data || {};
  } catch (error) {
    console.log("Failed to get the details", error);
    return {};
  }
}
