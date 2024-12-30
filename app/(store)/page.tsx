import Hero from "@/components/HeroSection/Hero";
import Products from "@/components/Products/Products";
import SelectCategories from "@/components/Select";
import { getCategories } from "@/sanity/lib/products/getCategories";
import { Suspense } from "react";

export default async function Home() {
  const categories = await getCategories();

  return (
    <div className="md:w-[80%] mx-auto py-8">
      <Hero />

      <SelectCategories categories={categories} />
      <Suspense fallback={<div>Loading...</div>}>
        <Products />
      </Suspense>
    </div>
  );
}
