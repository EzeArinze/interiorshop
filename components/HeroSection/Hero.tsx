import React from "react";
import HeroImage from "./HeroImage";
import HeroText from "./HeroText";

function Hero() {
  return (
    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
      <div className="mb-8 flex flex-wrap justify-between md:mb-10">
        <HeroText />
        <HeroImage />
      </div>
    </section>
  );
}

export default Hero;
