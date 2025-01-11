import { getProductsByCategories } from "@/sanity/lib/products/getProductsByCategories";
import CategoryCard from "./CategoryCard";

export const revalidate = 60;

type Cate = {
  newSlug: string;
};

async function Category({ newSlug }: Cate) {
  const productByCategory = await getProductsByCategories(newSlug);

  return (
    <>
      <CategoryCard data={productByCategory} />
    </>
  );
}

export default Category;
