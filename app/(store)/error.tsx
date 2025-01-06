"use client";

import React from "react";

function error() {
  return (
    <div className="font-bold text-center text-primary text-wrap w-[60%] mx-auto my-[50%] place-content-center">
      Something went wrong while fetching products check your network or try and
      refresh your page{" "}
    </div>
  );
}

export default error;
