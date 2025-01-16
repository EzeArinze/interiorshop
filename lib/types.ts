import {
  Banner_QueryResult,
  GET_ALL_PRODUCTResult,
  PRODUCT_BY_CATEGORIES_QUERYResult,
} from "@/sanity.types";

export type ProductViewProp = {
  data: GET_ALL_PRODUCTResult;
};

export type CategoryProps = {
  data: PRODUCT_BY_CATEGORIES_QUERYResult;
};

export type HeroImageType = {
  image: Banner_QueryResult;
};
