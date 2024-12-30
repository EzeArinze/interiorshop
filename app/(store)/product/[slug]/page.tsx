// import dynamic from "next/dynamic";

import ProductDetails from "@/components/Products/ProductDetails";
import React, { Suspense } from "react";

// const ProductDetails = dynamic(
//   () => import("@/components/Products/ProductDetails")
// );

async function Details({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="w-[80%]  mx-auto py-8">
      <h1 className="text-2xl font-semibold text-gray-800 px-3">
        Product Details
      </h1>
      <Suspense key={slug} fallback={<div>Loading...</div>}>
        <ProductDetails slug={slug} />
      </Suspense>
    </div>
  );
}

export default Details;
