import { Link } from "@chakra-ui/react";
import { cn } from "@/lib/utils";
import { Library, PlusIcon } from "lucide-react";
import { GrLinkNext } from "react-icons/gr";
import React from "react";
import LibraryPage from "../Sidebar/Library/page";
import LibrerieCards from "../Sidebar/Library/LibrerieCards";
import { Playlist } from "@/features/playlists";

interface NavMenuProps {
  currentUser?: {
    userId: string | null;
    userUrl: string | null;
    name: string | null;
    imageUrl: string | null;
  } | null;
  playlists: Playlist[] | null;
}

const NavMenu: React.FC<NavMenuProps> = ({ currentUser, playlists }) => {
  return (
    <div className="min-h-[60vh]">
      <div className="flex items-center justify-between ">
        <Link
          className={cn(
            "text-[15px] text-white decoration-none transition-colors hover:text-primary flex items-center justify-center sm:justify-center md:justify-start xl:justify-start 2xl:justify-start  "
          )}
        >
          <span     className={`w-6 h-6  hidden  sm:hidden md:hidden 2xl:flex xl:flex`}>
            <Library
              className={`w-6 h-6  items-center justify-center sm:justify-center md:justify-start xl:justify-start 2xl:justify-start `}
            />
          </span>
          <span className="hidden ml-5 sm:hidden md:hidden 2xl:flex xl:flex">
            Your Library
          </span>
        </Link>
        <div
          className="p-4
          md:py-1
          md:px-2
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          
          "
        >
          <PlusIcon className="w-5 h-5 mr-3 cursor-pointer hidden sm:block md:block 2xl:flex xl:flex" />
          {currentUser && (
            <GrLinkNext className="w-4 hidden sm:block md:block 2xl:flex xl:flex  h-4 cursor-pointer" />
          )}
        </div>
      </div>
      {playlists?.length ? <LibraryPage /> : <LibrerieCards />}
    </div>
  );
};

export default NavMenu;
