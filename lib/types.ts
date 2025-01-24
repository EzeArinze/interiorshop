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

export type User = {
  id: string;
  email: string | null;
  given_name: string | null;
  family_name: string | null;
  picture: string | null;
};
