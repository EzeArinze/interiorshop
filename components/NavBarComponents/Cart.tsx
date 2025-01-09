import React from "react";
import { ShoppingCart } from "lucide-react";

function Cart() {
  return (
    <div className="flex items-center gap-1 rounded hover:bg-primary hover:text-white border py-1 px-3">
      {/* <span className="hidden md:block font-semibold text-gray-500 hover:text-white">
        Cart
      </span> */}
      <div className="md:p-1">
        <ShoppingCart className="w-4 h-4" />
      </div>
    </div>
  );
}

export default Cart;
