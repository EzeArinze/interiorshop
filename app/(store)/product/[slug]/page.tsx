import LoadingSpinner from "@/components/Loader";
import ProductDetails from "@/components/Products/ProductDetails";
import { PRODUCT_DETIALResult } from "@/sanity.types";
import { productDetail } from "@/sanity/lib/products/productDetails";

import React, { Suspense } from "react";

// const ProductDetails = dynamic(
//   () => import("@/components/Products/ProductDetails")
// );

export const revalidate = 60;

async function Details({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const Detail: PRODUCT_DETIALResult = await productDetail(slug);

  return (
    <div className="w-[80%]  mx-auto py-8">
      <h1 className="text-2xl font-semibold text-gray-800 px-3">
        Product Details
      </h1>
      <Suspense key={slug} fallback={<LoadingSpinner />}>
        <ProductDetails Detail={Detail} />
      </Suspense>
    </div>
  );
}

export default Details;
