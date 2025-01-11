import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React from "react";

interface ProductImageProps {
  ImageData: unknown;
  alt?: string;
}

function ProductImage({ ImageData, alt }: ProductImageProps) {
  return (
    <div className="relative h-60 w-full">
      <Image
        src={ImageData ? urlFor(ImageData).width(300).height(320).url() : ""}
        alt={alt || "Product Image"}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="transition-transform duration-300 group-hover:scale-105 object-cover object-center rounded-t"
        priority
      />
    </div>
  );
}

export default ProductImage;
