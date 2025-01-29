import { NextResponse } from "next/server";
import { getProducts } from "@/sanity/lib/products/getProduct";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const start = parseInt(searchParams.get("start") || "0", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  try {
    const products = await getProducts(start, limit);
    return NextResponse.json(products);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
