"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Cart from "./Cart";
import { Button } from "../ui/button";
import { useHamburger } from "@/context/toggleContext";
import { Heart } from "lucide-react";
import useBasketStore from "@/store/store";

function NavBarLinks() {
  const pathname = usePathname();
  const { toggle } = useHamburger();
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, acc) => total + acc.quantity, 0)
  );

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

      <div className="relative">
        <Link href="/cart">
          <Cart />
        </Link>
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </div>
    </div>
  );
}

export default NavBarLinks;
