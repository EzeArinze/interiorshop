import { PRODUCT_DETIALResult } from "@/sanity.types";
import { productDetail } from "@/sanity/lib/productDetails/productDetails";
import Image from "next/image";
import { Button } from "../ui/button";
import { urlFor } from "@/sanity/lib/image";

interface ProductDetailsProps {
  slug: string;
}

const ProductDetails = async ({ slug }: ProductDetailsProps) => {
  const Detail: PRODUCT_DETIALResult = await productDetail(slug);

  if (!Detail) {
    return <div className="text-center mt-20">Product not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 items-start">
        {/* Image Section */}
        <div className="w-full">
          <div className="relative w-full h-[400px] md:h-[500px]  overflow-hidden bg-gray-50 shadow-sm rounded">
            <Image
              src={Detail?.images ? urlFor(Detail.images[0]).url() : ""}
              alt={Detail?.name || "Product Image"}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 40vw"
              className="rounded object-cover object-center"
              priority
            />
          </div>
        </div>

        {/* Details Section */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            {Detail.name}
          </h1>

          <p className="text-lg text-gray-600 mb-6">{Detail.description}</p>

          <div className="text-xl font-semibold text-green-700 mb-6">
            ${Detail.price}
          </div>

          <Button className="w-full lg:w-auto px-6 py-3 text-white font-medium rounded hover:bg-blue-500 transition-colors">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
