import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href={"/"} className="font-bold text-2xl">
      {" "}
      <span className="text-white  bg-primary rounded p-1 text-base sm:text-lg">
        Timeless
      </span>{" "}
      <span className=" text-base sm:text-lg">Home Style</span>
    </Link>
  );
}

export default Logo;
