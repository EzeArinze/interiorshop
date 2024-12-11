import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getProducts() {
  // const GET_ALL_PRODUCT = defineQuery(
  //   `*[_type == "product"] | order(name asc)`
  // );

  const GET_ALL_PRODUCT = defineQuery(
    `*[_type == "product"] | order(name asc) {name,
    price,"firstImage":images[0],stock,slug}
  `
  );

  try {
    const data = await sanityFetch({
      query: GET_ALL_PRODUCT,
    });

    return data.data || [];
  } catch (error) {
    console.log("Faild to fetch products", error);
    return [];
  }
}
