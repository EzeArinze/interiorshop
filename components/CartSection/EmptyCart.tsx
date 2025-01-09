"use client";

import Link from "next/link";

function EmptyCart() {
  return (
    <div className="text-center py-20">
      <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
      <p className="text-gray-600 mb-4">Start adding items to see them here!</p>
      <Link href={"/"} className="bg-primary text-white py-2 px-6 rounded-md">
        Shop Now
      </Link>
    </div>
  );
}

export default EmptyCart;
