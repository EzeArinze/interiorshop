"use client";

import Image from "next/image";
import EmptyCart from "./EmptyCart";
import CartSummary from "./CartSummary";
import DecIncButton from "./Dec-Inc-Button";
import useBasketStore from "@/store/store";
import { urlFor } from "@/sanity/lib/image";
import { useEffect, useState } from "react";
import LoadingSpinner from "../Loader";

export default function CartPage() {
  const getGroupedItem = useBasketStore((state) => state.getGroupedItem());

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <LoadingSpinner />;

  const calculateSubtotal = () =>
    getGroupedItem.reduce(
      (total, item) => total + (item.product?.price ?? 0) * item.quantity,
      0
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
        Your Cart
      </h1>

      {getGroupedItem.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product List */}
          <div className="lg:col-span-2 space-y-4">
            {getGroupedItem.map(
              (item) =>
                item.product && (
                  <div
                    key={item.product?._id}
                    className="flex items-center border p-4 rounded-md shadow-sm"
                  >
                    <Image
                      src={
                        item?.product?.images?.[0] || ""
                          ? urlFor(item.product?.images?.[0] ?? "")
                              .width(80)
                              .height(80)
                              .url()
                          : ""
                      }
                      alt={item.product?.name || "Cart images"}
                      width={80}
                      height={80}
                      className="rounded"
                    />
                    <div className="ml-4 flex-grow">
                      <h2 className="text-md md:text-lg font-medium">
                        {item.product?.name}
                      </h2>

                      <div className="mt-2 flex items-center">
                        <DecIncButton data={item.product} />
                      </div>
                    </div>
                    <div className="text-md md:text-lg font-medium text-right">
                      ${item.product.price?.toFixed(2) ?? "0.00"}
                    </div>
                  </div>
                )
            )}
          </div>

          {/* Summary Section */}
          <CartSummary calculateSubtotal={calculateSubtotal} />
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
