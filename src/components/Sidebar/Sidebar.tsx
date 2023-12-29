import React from "react";
import { MainNav } from "../Navbar/MainNav";
import NavMenu from "../Navbar/NavMenu";
import { Playlist } from "@/features/playlists";

interface SidebarProps {
  currentUser?: {
    userId: string | null;
    userUrl: string | null;
    name: string | null;
    imageUrl: string | null;
  } | null;
  playlists: Playlist[] | null;
}
const Sidebar: React.FC<SidebarProps> = ({ currentUser, playlists }) => {
  return (
    <div className="">
      <div
        className="bg-[#121212] text-white px-0  py-7 rounded-[10px] 2xl:px-3 xl:px-3 md:px-3  sm:px-1
      
      "
      >
        <MainNav />
      </div>

      <div className="bg-[#121212]  px-1  py-7 rounded-[10px] 2xl:px-3 xl:px-3 md:px-3  sm:px-1 text-white mt-2 ">
        <NavMenu playlists={playlists} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default Sidebar;
