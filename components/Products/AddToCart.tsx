"use client";

import { GET_ALL_PRODUCTResult } from "@/sanity.types";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import useBasketStore from "@/store/store";

type AddToBasketProp = {
  data: GET_ALL_PRODUCTResult;
  disabled?: boolean | undefined;
};

function AddToCart({ data, disabled }: AddToBasketProp) {
  const { addItem, getItemCount, items, removeItem } = useBasketStore();

  const alreadyExist = !!items.find((item) => item.product._id === data[0]._id);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleAddToCart = (value: GET_ALL_PRODUCTResult[number]) => {
    addItem(value);
    getItemCount(value._id);
  };

  return (
    <>
      {alreadyExist ? (
        <Button
          className="rounded font-semibold text-gray-800 hover:text-white w-full sm:w-auto sm:px-2 md:px-2"
          variant={"outline"}
          disabled={disabled}
          onClick={() => removeItem(data[0]._id)}
        >
          Remove
        </Button>
      ) : (
        <Button
          className="rounded font-semibold text-gray-800 hover:text-white w-full sm:w-auto sm:px-2 md:px-2"
          variant={"outline"}
          disabled={disabled}
          onClick={() => handleAddToCart(data[0])}
        >
          Add To Cart
        </Button>
      )}
    </>
  );
}

export default AddToCart;
