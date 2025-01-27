import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function fetchOrders(userId: string) {
  const GET_ORDER = defineQuery(
    `*[_type == "order" && kindeUserId == $userId] | order(orderDate desc) {
    _id,
    orderNumber,
    paystackCheckoutSessionId,
    customerName,
    email,
    totalPrice,
    currency,
    status,
    orderDate,
    products[] {
      _key,
      quantity,
      product-> {
        _id,
        name,
        price,
        currency,
        "imageUrl": image.asset->url
      }
    }
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
