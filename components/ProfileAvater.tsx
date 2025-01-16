"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, User, Receipt } from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import { useState } from "react";

interface ProfileAvatarProps {
  imageUrl?: string;
  name?: string;
}

export default function ProfileAvatar({ imageUrl, name }: ProfileAvatarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getAvatarFallback = () => {
    if (name && name.length > 0) {
      return name.charAt(0).toUpperCase();
    }
    return <User className="h-6 w-6" />;
  };

  const includeBlank = imageUrl?.includes("blank");

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-12 w-12 rounded-full p-0">
          <Avatar className="h-8 w-8">
            {!includeBlank && (
              <AvatarImage src={imageUrl} alt={name || "User avatar"} />
            )}

            <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 rounded bg-secondary" align="end">
        <div className="grid gap-4 ">
          {name && <div className="font-medium">{name}</div>}
          <div className="grid gap-2">
            <Link
              href={"/order"}
              className="flex justify-start items-center px-3 py-2 hover:bg-primary hover:text-white rounded text-[15px]"
              onClick={handleCloseModal}
            >
              {/* <Gift className="mr-2 h-4 w-4" /> */}
              <Receipt className="mr-2 h-4 w-4" />
              <span className="px-2">Orders</span>
            </Link>

            <LogoutLink>
              <Button
                variant="ghost"
                className="justify-start hover:bg-primary hover:text-white rounded w-full"
                onClick={handleCloseModal}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </Button>
            </LogoutLink>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
