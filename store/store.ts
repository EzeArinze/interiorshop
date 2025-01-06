// import { GET_ALL_PRODUCTResult, Product } from "@/sanity.types";
// import { create } from "zustand";
// import { devtools, persist } from "zustand/middleware";

// export interface BasketItem {
//   product: GET_ALL_PRODUCTResult;
//   quantity: number;
// }

// interface BasketState {
//   items: BasketItem[];
//   addItem: (product: GET_ALL_PRODUCTResult) => void;
//   removeItem: (productId: string) => void;
//   clearBasket: () => void;
//   getTotalPrice: () => number;
//   getItemCount: (productId: string) => number;
//   getGroupedItem: () => BasketItem[];
// }

// const useBasketStore = create<BasketState>()(
//   devtools(
//     persist(
//       (set, get) => ({
//         items: [],
//         addItem: (product) =>
//           set((state) => {
//             const existingItem = state.items.find(
//               (item) => item.product._id === product._id
//             );
//             if (existingItem) {
//               return {
//                 items: state.items.map((item) =>
//                   item.product._id === product._id
//                     ? { ...item, quantity: item.quantity + 1 }
//                     : item
//                 ),
//               };
//             } else {
//               return {
//                 items: [...state.items, { product, quantity: 1 }],
//               };
//             }
//           }),
//         removeItem: (productId) =>
//           set((state) => ({
//             items: state.items.reduce((acc, item) => {
//               if (item.product._id === productId) {
//                 if (item.quantity > 1) {
//                   acc.push({ ...item, quantity: item.quantity - 1 });
//                 }
//               } else {
//                 acc.push(item);
//               }
//               return acc;
//             }, [] as BasketItem[]),
//           })),
//         clearBasket: () => set({ items: [] }),
//         getTotalPrice: () =>
//           get().items.reduce(
//             (total, item) =>
//               total + (item?.product?.price ?? 0) * item.quantity,
//             0
//           ),
//         getItemCount: (productId) => {
//           const item = get().items.find(
//             (item) => item.product?._id === productId
//           );
//           return item ? item.quantity : 0;
//         },
//         getGroupedItem: () => get().items,
//       }),

//       {
//         name: "items-storage",
//       }
//     )
//   )
// );

// export default useBasketStore;

import { GET_ALL_PRODUCTResult } from "@/sanity.types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface BasketItem {
  product: GET_ALL_PRODUCTResult[number]; // Single product object from the array
  quantity: number;
}

interface BasketState {
  items: BasketItem[];
  addItem: (product: GET_ALL_PRODUCTResult[number]) => void;
  removeItem: (productId: string) => void;
  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItem: () => BasketItem[];
}

const useBasketStore = create<BasketState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        addItem: (product) =>
          set((state) => {
            const existingItem = state.items.find(
              (item) => item.product._id === product._id
            );
            if (existingItem) {
              return {
                items: state.items.map((item) =>
                  item.product._id === product._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                ),
              };
            } else {
              return {
                items: [...state.items, { product, quantity: 1 }],
              };
            }
          }),
        removeItem: (productId) =>
          set((state) => ({
            items: state.items.reduce((acc, item) => {
              if (item.product._id === productId) {
                if (item.quantity > 1) {
                  acc.push({ ...item, quantity: item.quantity - 1 });
                }
              } else {
                acc.push(item);
              }
              return acc;
            }, [] as BasketItem[]),
          })),
        clearBasket: () => set({ items: [] }),
        getTotalPrice: () =>
          get().items.reduce(
            (total, item) =>
              total + (item?.product?.price ?? 0) * item.quantity,
            0
          ),
        getItemCount: (productId) => {
          const item = get().items.find(
            (item) => item.product._id === productId
          );
          return item ? item.quantity : 0;
        },
        getGroupedItem: () => get().items,
      }),
      {
        name: "items-storage",
      }
    )
  )
);

export default useBasketStore;
