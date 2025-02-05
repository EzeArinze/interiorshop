// import { getProducts } from "@/sanity/lib/products/getProduct";
// import ProductsView from "./ProductsView";

// export const revalidate = 60;

// async function Products() {
//   const data = await getProducts();

//   return (
//     <div className="py-14">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <h1 className="font-serif text-4xl text-gray-900 mb-8 text-center">
//           Elevate Your Space
//         </h1>
//         <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
//           Discover our curated collection of exquisite interior decor pieces,
//           designed to transform your home into a sanctuary of style and comfort.
//         </p>
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-4">
//           <ProductsView data={data} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Products;

"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import ProductsView from "./ProductsView";

// Function to fetch products
async function fetchProducts({ pageParam = 0 }) {
  const res = await fetch(`/api/products?start=${pageParam}&limit=10`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

function ProductsClient({ initialProducts = [] }) {
  const { ref, inView } = useInView(); // Detect when user scrolls down

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["products"],
      queryFn: fetchProducts,
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 0 ? undefined : allPages.length * 10; // Next start index
      },
      initialData: {
        pages: [initialProducts], // Set initial products here
        pageParams: [0],
      },
      refetchOnWindowFocus: false,
    });

  const products = data?.pages.flat() || [];

  if (!products) return null;

  // Fetch next page when the last item is in view
  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

  return (
    <div className="py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl text-gray-900 mb-8 text-center">
          Elevate Your Space
        </h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Discover our curated collection of exquisite interior decor pieces,
          designed to transform your home into a sanctuary of style and comfort.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-4 lg:gap-8">
          <ProductsView data={products} />
        </div>
        {hasNextPage && (
          <div ref={ref} className="text-center mt-8">
            <p className="text-gray-500">
              {isFetchingNextPage
                ? "Loading more..."
                : "Scroll down to load more"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsClient;
