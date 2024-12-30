// import "server-only";

import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
// import { client } from "../client";

export async function getCategories() {
  const GET_CATEGORIES = defineQuery(`*[_type == "category"]|order(name asc)`);

  try {
    const category = await sanityFetch({
      query: GET_CATEGORIES,
    });

    // const category = await client.fetch(GET_CATEGORIES);

    return category.data || [];
  } catch (error) {
    console.log("Failed to get categories", error);
    return [];
  }
}
