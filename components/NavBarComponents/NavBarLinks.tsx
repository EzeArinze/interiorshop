"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Cart from "./Cart";
import { Button } from "../ui/button";
import { useHamburger } from "@/context/toggleContext";
import { Heart } from "lucide-react";

function NavBarLinks() {
  const pathname = usePathname();
  const { toggle } = useHamburger();

  return (
    <div className="flex items-center gap-4 ">
      <nav className="hidden sm:flex items-center ">
        <div className="font-semibold text-gray-500 transition duration-100 hover:text-gray-400">
          <Link
            href={"/"}
            className={`${
              pathname === "/" &&
              "text-white bg-primary p-2 rounded transition duration-100 hover:text-gray-100"
            } `}
          >
            Home
          </Link>
        </div>
      </nav>

      <div>
        <Button
          variant={"outline"}
          className="hidden md:block font-semibold text-gray-500 transition duration-100 hover:text-gray-100 hover:bg-primary rounded"
          onClick={toggle}
        >
          <span className="flex items-center gap-2">
            <p>Faverites</p>
            <Heart />
          </span>
        </Button>
      </div>

      <div>
        <Link href={"/cart"}>
          <Cart />
        </Link>
      </div>
    </div>
  );
}

export default NavBarLinks;
