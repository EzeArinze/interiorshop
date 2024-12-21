import { GET_ALL_PRODUCTResult } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductViewProp {
  data: GET_ALL_PRODUCTResult;
}

function ProductsView({ data }: ProductViewProp) {
  return (
    <>
      {!data || data.length < 1 ? (
        <p className="text-center text-gray-500">No Products Available</p>
      ) : (
        data.map((product) => (
          <div
            key={product.slug?.current}
            className="group rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300  overflow-hidden flex flex-col "
          >
            {/* Product Image */}
            <div className="relative h-60 w-full">
              <Image
                src={
                  product?.firstImage
                    ? urlFor(product.firstImage).width(300).height(320).url()
                    : ""
                }
                alt={product.name || "Product Image"}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="transition-transform duration-300 group-hover:scale-105 object-cover object-center rounded-t"
                priority
              />
            </div>

            {/* Product Details */}
            <div className="p-4 flex flex-col gap-1">
              <Link href={`/product/${product.slug?.current}`}>
                <h3 className="font-semibold  text-gray-800 truncate">
                  {product.name}
                </h3>
              </Link>

              <div className="mt-2 text-green-600 font-bold text-md">
                ${product.price}
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default ProductsView;
