"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { GET_CATEGORIESResult } from "@/sanity.types";
import { useQueryState } from "nuqs";

type Category = {
  categories: GET_CATEGORIESResult;
};

function SelectCategories({ categories }: Category) {
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "",
  });

  console.log(category);

  return (
    <div className="mx-auto max-w-2xl py-4 px-4 sm:pb-6 lg:max-w-7xl lg:px-8 ">
      <Select
        onValueChange={(value) => setCategory(value || null)}
        value={category}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Categories" />
        </SelectTrigger>
        <SelectContent className="bg-secondary">
          {categories?.map((category) => (
            <SelectItem key={category._id} value={category.name || ""}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectCategories;
