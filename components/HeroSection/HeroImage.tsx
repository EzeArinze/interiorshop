import { Banner_QueryResult } from "@/sanity.types";
import { getBannerImage } from "@/sanity/lib/bannerImage/getBannerImage";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

async function HeroImage() {
  const data: Banner_QueryResult = await getBannerImage();

  // if (data.length < 1) return <p>No Hero Image</p>;

  return (
    <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
      <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-xl bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
        <Image
          src={urlFor(data[0].firstImage).url()}
          alt="bannerImage1"
          width={500}
          height={500}
          priority
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="overflow-hidden rounded-xl bg-gray-100 shadow-lg">
        <Image
          src={urlFor(data[0].secondImage).url()}
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
