import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getBannerImage() {
  // const Banner_Query = defineQuery(`*[_type == "bannerImage"][0]"}`);

  const Banner_Query = defineQuery(`*[_type == "bannerImage"][0] {
    "firstImage": image1,
    "secondImage": image2
  }`);

  try {
    const data = await sanityFetch({
      query: Banner_Query,
    });

    return data.data || {};
  } catch (error) {
    console.log("Failed to fetch Sanity", error);
    return {};
  }
}
