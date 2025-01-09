"use client";

import { GET_ALL_PRODUCTResult } from "@/sanity.types";
import useBasketStore from "@/store/store";

type AddToBasketProp = {
  data: GET_ALL_PRODUCTResult[number]; // Expecting a single product object
};

function DecIncButton({ data }: AddToBasketProp) {
  const { addItem, getItemCount, removeItem } = useBasketStore();

  const handleAddToCart = () => {
    addItem(data);
  };

  const handleRemoveFromCart = () => {
    removeItem(data._id);
  };

  return (
    <div>
      <div className="flex items-center border rounded-md">
        <button
          className="px-2 py-1 text-sm md:text-base bg-gray-100"
          onClick={handleRemoveFromCart}
        >
          -
        </button>
        <span className="px-3 text-sm md:text-base">
          {getItemCount(data._id)}
        </span>
        <button
          className="px-2 py-1 text-sm md:text-base bg-gray-100"
          onClick={handleAddToCart}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default DecIncButton;
