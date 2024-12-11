import { GET_ALL_PRODUCTResult } from "@/sanity.types";
import { getProducts } from "@/sanity/lib/getAllProduct/getProduct";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

async function Products() {
  const data: GET_ALL_PRODUCTResult = await getProducts();

  return (
    <div className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8 lg:mt-20">
      <h1 className="font-bold mb-6 text-2xl">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center ">
        {data.map((product) => (
          <div
            key={product.name}
            className="h-[400px] w-[260px] rounded shadow hover:shadow-sm flex flex-col gap-2 transition-shadow duration-200"
          >
            <Image
              src={urlFor(product.firstImage)?.width(260).height(320).url()}
              alt="bannerImage1"
              width={260}
              height={320}
              priority
              className="h-auto w-auto object-cover object-center rounded-t"
            />

            <Link
              href={"/"}
              className="font-semibold text-gray-800 px-1 text-[15px]"
            >
              <span>
                <p>Name: {product.name}</p>
              </span>
              <span>
                <p>
                  Price:{" "}
                  <span className="text-green-700">${product.price}</span>
                </p>
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
