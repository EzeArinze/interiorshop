import { type SchemaTypeDefinition } from "sanity";
import { bannerImage } from "./bannerImage";
import { product } from "./productType";
import { category } from "./categoryType";
import { order } from "./orderType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [bannerImage, product, category, order],
};
