import Hero from "@/components/HeroSection/Hero";
import Products from "@/components/Products";

export default function Home() {
  return (
    <div className="md:w-[80%] mx-auto py-8">
      <Hero />
      <Products />
    </div>
  );
}
