// import { getProducts } from "@/sanity/lib/products/getProduct";
// import ProductsView from "./ProductsView";

// export const revalidate = 60;

// async function Products() {
//   const data = await getProducts();

//   return (
//     <div className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
//       <h1 className="font-bold  text-2xl text-gray-800 mb-8">Our Products</h1>
//       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         <ProductsView data={data} />
//       </div>
//     </div>
//   );
// }

// export default Products;

import { getProducts } from "@/sanity/lib/products/getProduct";
import ProductsView from "./ProductsView";

export const revalidate = 60;

async function Products() {
  const data = await getProducts();

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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-4">
          <ProductsView data={data} />
        </div>
      </div>
    </div>
  );
}

export default Products;
