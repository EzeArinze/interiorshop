import { getCategories } from "@/sanity/lib/getAllCategories/getCategories";
import Link from "next/link";
import React from "react";

async function Categories() {
  const data = await getCategories();

  return (
    <div className="overflow-x-auto whitespace-nowrap pb-10 w-[80%] mx-auto">
      <div className="text-center pb-5">
        <h2 className="text-lg font-semibold">Categories </h2>
      </div>

      {data.map((category) => (
        <div key={category._id} className="inline-block px-2">
          {/* <Link href={`/category/${category.name}`}>
            <h1 className="text-base font-semibold">{category.name}</h1>
          </Link> */}
          <Link href={"/"}>
            <h1 className="text-base font-semibold">{category.name}</h1>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Categories;
