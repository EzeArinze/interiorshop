import { getProducts } from "@/sanity/lib/getAllProduct/getProduct";

import ProductsView from "./ProductsView";

async function Products() {
  const data = await getProducts();

  return (
    <div className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
      <h1 className="font-bold  text-2xl text-gray-800 mb-8">Our Products</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductsView data={data} />
      </div>
    </div>
  );
}

export default Products;
