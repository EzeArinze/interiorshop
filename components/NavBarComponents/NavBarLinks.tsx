"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Cart from "./Cart";
import useBasketStore from "@/store/store";
import { Button } from "../ui/button";
import { LoginLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import ProfileAvatar from "../ProfileAvater";

function NavBarLinks() {
  const pathname = usePathname();
  const { user } = useKindeBrowserClient();

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

      <div>
        {/* <Link
          href={"/sign-in"}
          className="flex items-center gap-1 rounded hover:bg-primary hover:text-white border py-1 px-3"
        >
          <span className="flex items-center gap-2">
            <User2 className="w-4 h-4" />
            <p className="hidden md:block">Login</p>
          </span>
        </Link> */}

        {!user ? (
          <LoginLink>
            <Button
              variant={"outline"}
              className="rounded hover:bg-primary hover:text-white border px-3"
            >
              Login
            </Button>
          </LoginLink>
        ) : (
          <ProfileAvatar
            imageUrl={user?.picture || ""}
            name={user?.given_name || ""}
          />
        )}
      </div>
    </div>
  );
}

export default NavBarLinks;
