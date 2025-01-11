"use client";

import { PRODUCT_DETIALResult } from "@/sanity.types";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import useBasketStore from "@/store/store";
import { ShoppingCart } from "lucide-react";

type AddToBasketProp = {
  data: PRODUCT_DETIALResult;
};

function AddToCart({ data }: AddToBasketProp) {
  const { addItem, getItemCount, items, removeItem } = useBasketStore();

  const alreadyExist = !!items.find(
    (item) => item.product && data && item.product._id === data._id
  );

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleAddToCart = (value: PRODUCT_DETIALResult) => {
    addItem(value);
    if (value?._id) {
      getItemCount(value._id);
    }
  };

  return (
    <>
      {alreadyExist ? (
        <Button
          className="rounded font-semibold text-gray-800 hover:text-white w-full sm:w-auto sm:px-2 md:px-2"
          variant={"outline"}
          onClick={() => data && removeItem(data._id)}
        >
          <span>Remove From Cart</span>
          <ShoppingCart />
        </Button>
      ) : (
        <Button
          className="rounded font-semibold text-gray-800 hover:text-white w-full sm:w-auto sm:px-2 md:px-2"
          variant={"outline"}
          disabled={alreadyExist}
          onClick={() => data && handleAddToCart(data)}
        >
          <span>Add To Cart</span>
          <ShoppingCart />
        </Button>
      )}
    </>
  );
}

export default AddToCart;
