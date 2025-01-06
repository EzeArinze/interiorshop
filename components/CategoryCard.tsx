"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import ProductImage from "./Products/ProductImage";
import { CategoryProps } from "@/lib/types";

const CategoryCard = ({ data }: CategoryProps) => {
  return (
    <div className="container mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence>
        {data.map((product) => (
          <motion.div
            key={product._id}
            layout
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white shadow-md rounded-lg overflow-hidden group w-[75%]"
          >
            {/* Category Image */}

            <ProductImage
              ImageData={product?.images?.[0]}
              alt={product.name || ""}
            />

            {/* Category Name */}
            <div className="p-4">
              <Link href={`/product/${product.slug?.current}`}>
                <h3 className="text-lg font-semibold truncate group-hover:text-gray-600">
                  {product.name}
                </h3>
              </Link>
              <p className="text-gray-600 mt-2">${product.price}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CategoryCard;
