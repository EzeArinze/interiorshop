import Hero from "@/components/HeroSection/Hero";
import Products from "@/components/Products/Products";
import SelectCategories from "@/components/Select";
import { getCategories } from "@/sanity/lib/products/getCategories";
import { getProducts } from "@/sanity/lib/products/getProduct";
import { Suspense } from "react";

export default async function Home() {
  const categories = await getCategories();
  const data = await getProducts();

  if (!data)
    return <h1 className="text-center text-gray-500">No Products Available</h1>;

  return (
    <div className="md:w-[80%] mx-auto py-8">
      <Hero />

      <SelectCategories categories={categories} />

      <Suspense fallback={<div>Loading...</div>}>
        <Products data={data} />
      </Suspense>
    </div>
  );
}
