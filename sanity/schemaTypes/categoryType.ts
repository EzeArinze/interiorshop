import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  type: "document",
  title: "Categories",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Product Category",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Category Slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      // subtitle: "name",
    },
    prepare(select) {
      return {
        title: select.title,
        // subtitle: `${select.subtitle}`,
      };
    },
  },
});
