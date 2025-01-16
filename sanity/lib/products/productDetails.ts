import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
// import { cache } from "react";

export async function productDetail(slug: string) {
  const PRODUCT_DETIAL = defineQuery(
    `*[_type == "product" && slug.current == $slug][0]`
  );

  try {
    const details = await sanityFetch({
      query: PRODUCT_DETIAL,
      params: { slug },
    });

    return details.data || {};
  } catch (error) {
    console.log("Failed to get the details", error);
    return {};
  }
}

// export const productDetail = cache(async (slug: string) => {
//   const PRODUCT_DETIAL = defineQuery(
//     `*[_type == "product" && slug.current == "${slug}"][0]`
//   );

//   try {
//     const details = await sanityFetch({
//       query: PRODUCT_DETIAL,
//     });

//     return details.data || {};
//   } catch (error) {
//     console.log("Failed to get the details", error);
//     return {};
//   }
// });
