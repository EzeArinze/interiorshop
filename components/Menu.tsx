"use client";

import { useHamburger } from "@/context/toggleContext";
import { ChartNoAxesGantt, X } from "lucide-react";

function Menu() {
  const { toggleHamburger, toggle } = useHamburger();

  const handleOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      toggle();
    }
  };

  return (
    <>
      {toggleHamburger && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 transition-opacity duration-300"
          onClick={handleOutside}
        />
      )}
      <div
        className={`fixed top-0 right-0 md:w-[30%] w-[48%] h-full rounded bg-background transition-transform duration-300 ${
          toggleHamburger ? "translate-x-0" : "translate-x-full"
        }  z-50 bg-opacity-95 shadow-sm`}
      >
        <div>
          <span className="flex items-center justify-between py-4 px-2">
            <div>Sidebar Content</div>

            <X className=" duration-1000" onClick={toggle} />
          </span>
        </div>
      </div>

      {!toggleHamburger && (
        <ChartNoAxesGantt className="sm:hidden duration-150" onClick={toggle} />
      )}
    </>
  );
}

export default Menu;
