import React from "react";
import { IconType } from "react-icons";

interface MenuProps {
  icon: IconType;
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Menu: React.FC<MenuProps> = ({ icon: Icon, label }) => {
  return (
    <div
      className="bg-[#242424] w-full rounded-[5px]  
    
    justify-center 
    items-center 
    flex 
    overflow-x-hidden 
    overflow-y-auto 
    fixed 
    inset-0 
    z-50 
    outline-none 
    focus:outline-none
    bg-neutral-800/70"
    >
      <div
        className="
          relative 
          w-full
          md:w-4/6
          lg:w-3/6
          xl:w-2/5
          my-6
          mx-auto 
          h-full 
          lg:h-auto
          md:h-auto
          "
      >
        <div className="w-full max-w-100px p-4 flex items-center font-[600] text-[15px]">
          <Icon className="w-5 h-5 mr-3" />
          <p>{label}</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
