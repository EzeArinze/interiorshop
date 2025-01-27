import { defineArrayMember, defineField, defineType } from "sanity";

export const order = defineType({
  name: "order",
  type: "document",
  title: "Order",
  fields: [
    defineField({
      name: "orderNumber",
      title: "OrderNumber",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "paystackCheckoutSessionId",
      title: "Paystack Checkout Session ID",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "kindeUserId",
      title: "Store User Id",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Customer Email",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "paystackPaymentIntentId",
      title: "Paystack Payment Intent ID",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "product",
              title: "Product Bought",
              type: "reference",
              to: [{ type: "product" }],
            }),
            defineField({
              name: "quantity",
              title: "Qauntity Purchased",
              type: "number",
            }),
          ],
          preview: {
            select: {
              product: "product.name",
              quantity: "quantity",
              images: "product.images",
              price: "product.price",
              currency: "product.currency",
            },
            prepare(select) {
              return {
                title: `${select.product} x ${select.quantity}`,
                subtitle: `${select.price * select.quantity}`,
                media: select.images.at(0),
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "totalPrice",
      title: "Total Price",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    // defineField({
    //   name: "amountDiscount",
    //   title: "Amount Discount",
    //   type: "number",
    //   validation: (rule) => rule.min(0),
    // }),
    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
    }),
    defineField({
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: "customerName",
      amount: "totalPrice",
      currency: "currency",
      orderId: "orderNumber",
      email: "email",
    },
    prepare(select) {
      const orderIdSnipet = `${select.orderId.slice(0, 5)}...${select.orderId.slice(-5)}`;
      return {
        title: `${select.name} (${orderIdSnipet})`,
        subtitle: `${select.amount} ${select.currency}, ${select.email}`,
      };
    },
  },
});

// import { defineArrayMember, defineField, defineType } from "sanity";

// export const order = defineType({
//   name: "order",
//   type: "document",
//   title: "Order",
//   fields: [
//     // Order Number
//     defineField({
//       name: "orderNumber",
//       title: "Order Number",
//       type: "string",
//       validation: (rule) => rule.required(),
//     }),

//     // Paystack Checkout Session ID
//     defineField({
//       name: "paystackCheckoutSessionId",
//       title: "Paystack Checkout Session ID",
//       type: "string",
//       validation: (rule) => rule.required(),
//     }),

//     // Kinde User ID
//     defineField({
//       name: "kindeUserId",
//       title: "Store User ID",
//       type: "string",
//       validation: (rule) => rule.required(),
//     }),

//     // Customer Name
//     defineField({
//       name: "customerName",
//       title: "Customer Name",
//       type: "string",
//       validation: (rule) => rule.required(),
//     }),

//     // Customer Email
//     defineField({
//       name: "email",
//       title: "Customer Email",
//       type: "string",
//       validation: (rule) => rule.required(),
//     }),

//     // Paystack Payment Intent ID
//     defineField({
//       name: "paystackPaymentIntentId",
//       title: "Paystack Payment Intent ID",
//       type: "string",
//       validation: (rule) => rule.required(),
//     }),

//     // Total Price
//     defineField({
//       name: "totalPrice",
//       title: "Total Price",
//       type: "number",
//       validation: (rule) => rule.required().min(0),
//     }),

//     // Currency
//     defineField({
//       name: "currency",
//       title: "Currency",
//       type: "string",
//       validation: (rule) => rule.required(),
//     }),

//     // Order Date
//     defineField({
//       name: "orderDate",
//       title: "Order Date",
//       type: "datetime",
//       validation: (rule) => rule.required(),
//     }),

//     // Order Status
//     defineField({
//       name: "status",
//       title: "Order Status",
//       type: "string",
//       options: {
//         list: [
//           { title: "Pending", value: "pending" },
//           { title: "Paid", value: "paid" },
//           { title: "Shipped", value: "shipped" },
//           { title: "Delivered", value: "delivered" },
//           { title: "Cancelled", value: "cancelled" },
//         ],
//       },
//     }),

//     // Products Array
//     defineField({
//       name: "products",
//       title: "Products",
//       type: "array",
//       of: [
//         defineArrayMember({
//           type: "object",
//           fields: [
//             // Reference to Product
//             defineField({
//               name: "product",
//               title: "Product",
//               type: "reference",
//               to: [{ type: "product" }],
//             }),

//             // Quantity
//             defineField({
//               name: "quantity",
//               title: "Quantity",
//               type: "number",
//               validation: (rule) => rule.required().min(1),
//             }),
//           ],
//           preview: {
//             select: {
//               product: "product.name",
//               quantity: "quantity",
//               price: "product.price",
//               currency: "product.currency",
//               images: "product.image",
//             },
//             prepare(select) {
//               const { product, quantity, price, currency, images } = select;
//               return {
//                 title: `${product} x ${quantity || 1}`,
//                 subtitle:
//                   price && quantity
//                     ? `${currency || ""} ${price * quantity}`
//                     : "Price unavailable",
//                 media:
//                   Array.isArray(images) && images.length ? images[0] : null,
//               };
//             },
//           },
//         }),
//       ],
//     }),
//   ],

//   // Document Preview
//   preview: {
//     select: {
//       orderNumber: "orderNumber",
//       customerName: "customerName",
//       totalPrice: "totalPrice",
//       currency: "currency",
//       status: "status",
//     },
//     prepare(select) {
//       const { orderNumber, customerName, totalPrice, currency, status } =
//         select;
//       const snippet = orderNumber
//         ? `${orderNumber.slice(0, 5)}...${orderNumber.slice(-5)}`
//         : "Order ID unavailable";
//       return {
//         title: `${customerName || "Unknown Customer"} (${snippet})`,
//         subtitle: `${totalPrice || 0} ${currency || "NGN"} - ${status || "Status not set"}`,
//       };
//     },
//   },
// });
