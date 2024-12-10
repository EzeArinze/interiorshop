import { client, urlFor } from "@/app/sanity/client";
import { SanityDocument } from "next-sanity";
import Image from "next/image";
import React from "react";

async function getData() {
  const query = `*[_type == "bannerImage"][0]`;

  const data = await client.fetch<SanityDocument>(query);
  return data;
}

async function HeroImage() {
  const data = await getData();

  return (
    <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
      <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-xl bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
        <Image
          src={urlFor(data.image1).url()}
          alt="bannerImage1"
          width={500}
          height={500}
          priority
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="overflow-hidden rounded-xl bg-gray-100 shadow-lg">
        <Image
          src={urlFor(data.image2).url()}
          alt="bannerImage1"
          width={500}
          height={500}
          priority
          className="h-full w-full object-cover object-center"
        />
      </div>
    </div>
  );
}

export default HeroImage;
