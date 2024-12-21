import ProductDetails from "@/components/Products/ProductDetails";
import React from "react";

async function Details({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="w-[80%]  mx-auto py-8">
      {slug}
      <ProductDetails slug={slug} />
    </div>
  );
}

export default Details;
