// import { PRODUCT_DETIALResult } from "@/sanity.types";
// // import { productDetail } from "@/sanity/lib/products/productDetails";
// import Image from "next/image";
// import { urlFor } from "@/sanity/lib/image";
// import AddToCart from "./AddToCart";
// import { formatCurrency } from "@/lib/formatCurrency";

// interface ProductDetailsProps {
//   // slug: string;
//   Detail: PRODUCT_DETIALResult;
// }

// const ProductDetails = ({ Detail }: ProductDetailsProps) => {
//   // const Detail: PRODUCT_DETIALResult = await productDetail(slug);

//   if (!Detail) {
//     return <div className="text-center mt-20">Product not found.</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 ">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 items-start">
//         {/* Image Section */}
//         <div className="w-full">
//           <div className="relative w-full h-[400px] md:h-[500px]  overflow-hidden bg-gray-50 shadow-sm rounded">
//             <Image
//               src={Detail?.images ? urlFor(Detail.images[0]).url() : ""}
//               alt={Detail?.name || "Product Image"}
//               fill
//               sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 40vw"
//               className="rounded object-cover object-center"
//               priority
//             />
//           </div>
//           <div className="mt-2 border-t-2 pt-2">
//             {Detail?.images?.map((image, index) => (
//               <Image
//                 key={index}
//                 src={image ? urlFor(image).width(50).height(50).url() : ""}
//                 alt={image.asset?._ref || ""}
//                 height={80}
//                 width={60}
//                 className="rounded object-cover object-center w-auto h-auto"
//               />
//             ))}
//           </div>
//         </div>

//         {/* Details Section */}
//         <div>
//           <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
//             {Detail.name}
//           </h1>

//           <p className="text-lg text-gray-600 mb-6">{Detail.description}</p>

//           <div className="text-xl font-semibold text-green-700 mb-6">
//             {formatCurrency(Detail.price || 0)}
//             {/* ${Detail.price} */}
//           </div>

//           <AddToCart data={Detail} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

"use client";

import { useState } from "react";
import { PRODUCT_DETIALResult } from "@/sanity.types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import AddToCart from "./AddToCart";
import { formatCurrency } from "@/lib/formatCurrency";

interface ProductDetailsProps {
  Detail: PRODUCT_DETIALResult;
}

const ProductDetails = ({ Detail }: ProductDetailsProps) => {
  const [selectedImage, setSelectedImage] = useState(
    Detail?.images?.[0] || null
  );

  if (!Detail) {
    return <div className="text-center mt-20">Product not found.</div>;
  }

  const handleThumbnailClick = (image: unknown) => {
    if (typeof image === "object" && image !== null && "asset" in image) {
      setSelectedImage(image as typeof selectedImage);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 items-start">
        {/* Image Section */}
        <div className="w-full">
          <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-gray-50 shadow-sm rounded">
            <Image
              src={selectedImage ? urlFor(selectedImage).url() : ""}
              alt={Detail?.name || "Product Image"}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 40vw"
              className="rounded object-cover object-center"
              priority
            />
          </div>

          {/* Thumbnails */}
          <div className="mt-2 border-t-2 pt-2 flex gap-2 overflow-x-auto">
            {Detail?.images?.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(image)}
                className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700  rounded${
                  selectedImage === image ? "ring-2 ring-gray-700" : ""
                }`}
                aria-label={`View ${Detail.name} image ${index + 1}`}
              >
                <Image
                  src={image ? urlFor(image).width(60).height(60).url() : ""}
                  alt={`${Detail.name} thumbnail ${index + 1}`}
                  height={80}
                  width={80}
                  className="rounded object-cover object-center w-auto h-auto"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div>
          <h1 className="font-serif text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            {Detail.name}
          </h1>

          <p className="text-lg text-gray-600 mb-6">{Detail.description}</p>

          <div className="text-xl font-semibold text-green-700 mb-6">
            {formatCurrency(Detail.price || 0)}
          </div>

          <AddToCart data={Detail} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
