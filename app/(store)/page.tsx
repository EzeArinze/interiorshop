import Hero from "@/components/HeroSection/Hero";
import LoadingSpinner from "@/components/Loader";
import Products from "@/components/Products/Products";
import SelectCategories from "@/components/Select";
import { getBannerImage } from "@/sanity/lib/bannerImage/getBannerImage";
import { getCategories } from "@/sanity/lib/products/getCategories";
import { Suspense } from "react";

export const revalidate = 60;

export default async function Home() {
  const categories = await getCategories();
  const heroImage = await getBannerImage();

  if (!categories)
    return (
      <h1 className="text-center text-gray-500">No categories Available</h1>
    );

  return (
    <div className="md:w-[80%] mx-auto py-8">
      <Hero image={heroImage} />

      <SelectCategories categories={categories} />

      <Suspense fallback={<LoadingSpinner />}>
        <Products />
      </Suspense>
    </div>
  );
}
