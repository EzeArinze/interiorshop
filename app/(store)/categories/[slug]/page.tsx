import Category from "@/components/CategorySection/Category";
import LoadingSpinner from "@/components/Loader";
// import CategoryCard from "@/components/CategoryCard";
import SelectCategories from "@/components/Select";
import { getCategories } from "@/sanity/lib/products/getCategories";
// import { getProductsByCategories } from "@/sanity/lib/products/getProductsByCategories";
import { Suspense } from "react";

async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const newSlug = decodeURIComponent(slug || "");

  // const productByCategory = await getProductsByCategories(newSlug);

  const data = await getCategories();

  return (
    <div className="md:w-[80%] mx-auto py-8">
      <div className="mx-auto max-w-2xl px-6 sm:pb-6 lg:max-w-7xl lg:px-8">
        <div>
          <h1 className="lg:px-8 font-bold text-lg text-gray-800 mt-4">
            Selected Category: {newSlug.toUpperCase()}
          </h1>
          <SelectCategories categories={data} />
          <div>
            <Suspense fallback={<LoadingSpinner />}>
              {/* <CategoryCard data={productByCategory} /> */}
              <Category newSlug={newSlug} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
