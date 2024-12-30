"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { GET_CATEGORIESResult } from "@/sanity.types";
import { useRouter } from "next/navigation";

type Category = {
  categories: GET_CATEGORIESResult;
};

function SelectCategories({ categories }: Category) {
  const router = useRouter();

  const handleChange = (value: string | null): void => {
    if (!value) return;

    router.push(`/categories/${value}`);
  };

  return (
    <div className="mx-auto max-w-2xl py-4 px-4 sm:pb-6 lg:max-w-7xl lg:px-8 ">
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
  );
}

export default SelectCategories;
