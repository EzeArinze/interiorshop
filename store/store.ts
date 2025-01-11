import { PRODUCT_DETIALResult } from "@/sanity.types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface BasketItem {
  product: PRODUCT_DETIALResult; // Single product objects
  quantity: number;
}

interface BasketState {
  items: BasketItem[];
  addItem: (product: PRODUCT_DETIALResult) => void;
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
              (item) => item.product?._id === product?._id
            );
            if (existingItem) {
              return {
                items: state.items.map((item) =>
                  item.product?._id === product?._id
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
              if (item?.product?._id === productId) {
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
            (item) => item?.product?._id === productId
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
