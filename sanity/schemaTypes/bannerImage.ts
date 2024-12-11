import { defineField, defineType } from "sanity";

export const bannerImage = defineType({
  name: "bannerImage",
  type: "document",
  title: "BannerImage",
  fields: [
    defineField({
      name: "image1",
      type: "image",
      title: "First Image",
    }),
    defineField({
      name: "image2",
      type: "image",
      title: "Second Image",
    }),
  ],
});
