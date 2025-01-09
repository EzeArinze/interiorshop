// "use client";

import Link from "next/link";
import { Button } from "../ui/button";

type CartSummaryType = {
  calculateSubtotal: () => number;
};

function CartSummary({ calculateSubtotal }: CartSummaryType) {
  return (
    <section className="bg-secondary p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>${calculateSubtotal().toFixed(2)}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span>Shipping</span>
        <span>$20.00</span>
      </div>

      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>${(calculateSubtotal() + 20).toFixed(2)}</span>
      </div>

      <button className="w-full mt-4 bg-primary text-white py-2 rounded font-semibold">
        Proceed to Checkout
      </button>

      <Button
        variant={"outline"}
        className="w-full mt-4 text-gray-600 py-2 rounded hover:text-white"
      >
        <Link href={"/"}>Continue Shopping</Link>
      </Button>
    </section>
  );
}

export default CartSummary;
