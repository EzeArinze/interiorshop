"use client";

// import { urlFor } from "@/sanity/lib/image";
// import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import ProductImage from "./ProductImage";
import { ProductViewProp } from "@/lib/types";

function ProductsView({ data }: ProductViewProp) {
  return (
    <>
      {!data ? (
        <p className="text-center text-gray-500">No Products Available</p>
      ) : (
        data?.map((product) => (
          <AnimatePresence key={product.slug?.current}>
            <motion.div
              layout
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="group rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300  overflow-hidden flex flex-col ">
                {/* Product Image */}

                <ProductImage
                  ImageData={product?.firstImage}
                  alt={product.name || "Product Image"}
                />

                {/* Product Details */}
                <div className="p-4 flex flex-col gap-1">
                  <Link href={`/product/${product.slug?.current}`}>
                    <h3 className="font-semibold  text-gray-800 truncate">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="mt-2 font-bold text-md flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
                    <span className="text-green-600 md:text-left w-[100%]">
                      ${product.price}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        ))
      )}
    </>
  );
}

export default ProductsView;
