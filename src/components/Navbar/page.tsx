import React from "react";
import NavigationButton from "../Button/NavigationButton";
import UserMenu from "../Menu/UserMenu";
import SearchBar from "./SearchBar";

interface NavbarProps {
  currentUser?: {
    userId: string | null;
    userUrl: string | null;
    name: string | null;
    imageUrl: string | null;
  } | null;
  searchBar?: boolean;
  hidden?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, searchBar, hidden }) => {
  return (
    <div className="flex items-center w-full h-[80px] jusity-center">
      <div className="flex items-center justify-between w-full ">
        <div
          className={`flex items-center 
          ${hidden && "hidden sm:hidden md:hidden xl:flex 2xl:flex"}`}
        >
          <NavigationButton />
        </div>
        {searchBar && (
          <div>
            <SearchBar />
          </div>
        )}
        <div
          className={`flex items-center 
          ${hidden && "hidden sm:hidden md:hidden xl:flex 2xl:flex"}`}
        >
          <UserMenu currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
