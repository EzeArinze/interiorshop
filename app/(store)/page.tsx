// import Categories from "@/components/Categories";
import Hero from "@/components/HeroSection/Hero";
import Products from "@/components/Products/Products";
import SelectCategories from "@/components/Select";
import { getCategories } from "@/sanity/lib/getAllCategories/getCategories";

export default async function Home() {
  const categories = await getCategories();

  return (
    <div className="md:w-[80%] mx-auto py-8">
      <Hero />
      {/* <Categories /> */}
      <SelectCategories categories={categories} />
      <Products />
    </div>
  );
}
