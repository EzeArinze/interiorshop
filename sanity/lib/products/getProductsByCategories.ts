import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getProductsByCategories(categorySlug: string) {
  const PRODUCT_BY_CATEGORIES_QUERY = defineQuery(`
    *[_type == "product" && references(*[_type == "category" && slug.current == $categorySlug][0]._id)]
  `);

  try {
    const productByCategory = await sanityFetch({
      query: PRODUCT_BY_CATEGORIES_QUERY,
      params: {
        categorySlug,
      },
    });

    return productByCategory.data || [];
  } catch (error) {
    console.log("Error getting product by Category", error);
    return [];
  }
}
