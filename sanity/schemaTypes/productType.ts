import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  type: "document",
  title: "Products",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Product name",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      type: "array",
      title: "Product images",
      of: [{ type: "image" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description of Products",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Product Slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      type: "number",
      title: "Price",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "array",
      title: "Product Category",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "stock",
      type: "number",
      title: "Stock",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "images",
      subtitle: "price",
    },
    prepare(select) {
      return {
        title: select.title,
        subtitle: `NGN${select.subtitle}`,
        media: select.media.at(0),
      };
    },
  },
});
