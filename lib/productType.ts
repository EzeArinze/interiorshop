export interface Product {
  _id: string;
  name?: string;
  slug?: {
    current?: string;
  };
  price?: number;
  firstImage?: string; // Adjust this based on your actual image type
}

// Props for the ProductsView component
export interface ProductsViewProps {
  data: Product[];
}
