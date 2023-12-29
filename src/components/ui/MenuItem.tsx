"use client";

import { IconType } from "react-icons";

interface MenuItemProps {
  onClick: () => void;
  label: string;
  icon: IconType;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, icon: Icon }) => {
  return (
    <div
      onClick={onClick}
      className="
        px-4 
        py-3 
        transition
        font-sm
      "
    >
      <div className="w-full max-w-100px flex items-center ">
        <p>{label}</p>
        <Icon className="absolute right-2 " style={{ fontSize: "20px" }} />
      </div>
    </div>
  );
};

export default MenuItem;
