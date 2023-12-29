"use client";

import React, { useCallback, useState } from "react";
import Avatar from "../ui/avatar";
import MenuItem from "../ui/MenuItem";
import { MdOpenInNew } from "react-icons/md";
import Button from "../Button/Button";

interface UserMenuProps {
  currentUser?: {
    userId: string | null;
    userUrl: string | null;
    name: string | null;
    imageUrl: string | null;
  } | null;
}
const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const Logout = () => {
    localStorage.removeItem("spotify_token");
    setTimeout(() => {
      window.location.assign("/login");
    }, 100);
  };

  return (
    <div className="relative">
      {currentUser?.userId !== null ? (
        <div>
          <div className="flex flex-row items-center gap-5">
            <div className="hidden md:block text-sm font-semibold rounded-full  transition  cursor-pointer">
              Explore to Premium
            </div>
            <div
              onClick={toggleOpen}
              className="p-4 md:py-1 md:px-2 flex  flex-rowitems-center  gap-1 cursor-pointer  hover:shadow-md  transition "
            >
              <div className="flex rounded-full  border-black  border-[3px]">
                <Avatar src={currentUser?.imageUrl} />
              </div>
            </div>
          </div>
          {isOpen && (
            <div className="z-10 absolute  rounded-[5px] shadow-md w-[60vw]  md:w-3/4   bg-[#242424]  overflow-hidden   right-0   top-12   text-sm">
              <div className="flex flex-col cursor-pointer ">
                <MenuItem
                  label="Account"
                  onClick={() =>
                    window.location.assign(
                      ` https://open.spotify.com/user/${currentUser?.userId}`
                    )
                  }
                  icon={MdOpenInNew}
                />

                <MenuItem
                  label="Profile"
                  onClick={() =>
                    window.location.assign(
                      ` https://open.spotify.com/user/${currentUser?.userId}`
                    )
                  }
                  icon={MdOpenInNew}
                />
                <MenuItem label="Logout" onClick={Logout} icon={MdOpenInNew} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center min-w-[300px]">
          <div className="w-full mr-3">
            <Button label="Signup" border onClick={Logout} small />
          </div>
          <div className="w-full">
            <Button label="Login" outline onClick={Logout} small />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
