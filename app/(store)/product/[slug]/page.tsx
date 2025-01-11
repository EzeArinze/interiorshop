// import dynamic from "next/dynamic";

import LoadingSpinner from "@/components/Loader";
import ProductDetails from "@/components/Products/ProductDetails";
// import { revalidatePath } from "next/cache";
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
      <Suspense key={slug} fallback={<LoadingSpinner />}>
        <ProductDetails slug={slug} />
      </Suspense>
    </div>
  );
}

export default Details;
