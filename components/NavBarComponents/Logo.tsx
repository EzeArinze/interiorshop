import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href={"/"} className="font-bold text-2xl">
      {" "}
      <span className="text-white  bg-primary rounded p-1">Luxe</span> Design
    </Link>
  );
}

export default Logo;
