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
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "name",
    },
  },
});
