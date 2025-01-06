"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { GET_CATEGORIESResult } from "@/sanity.types";
import { useRouter, useSearchParams } from "next/navigation";

type Category = {
  categories: GET_CATEGORIESResult;
};

function SelectCategories({ categories }: Category) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const handleChange = (value: string | null): void => {
    if (!value) return;

    // Get current search parameters
    const params = new URLSearchParams(searchParams.toString());

    params.set("category", value);

    console.log(params.get("category"));

    router.push(`/categories/${params.get("category")}`);
  };

  // const handleChange = (value: string | null): void => {
  //   if (!value) return;

  //   router.push(`/categories/${value}`);
  // };

  return (
    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-4">
      <div className="py-4  ">
        <Select onValueChange={handleChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Categories" />
          </SelectTrigger>
          <SelectContent className="bg-secondary">
            {categories?.map((category) => (
              <SelectItem
                key={category._id}
                value={category?.slug?.current || ""}
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}

export default SelectCategories;
