import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  border?: boolean;
  bgColor?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  label,
  bgColor,
  onClick,
  disabled,
  outline,
  small,
  border,
  icon: Icon,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
      relative
      disabled:opacity-70
      disabled:cursor-not-allowed
      rounded-[50px]
      hover:opacity-80
      transition
      w-full
      ${border && "bg-transparent"}
      ${border && "border-[#ccc]"}
      ${border && "border-[1px]"}
      ${outline ? "bg-white" : "bg-[#1ed760]"}
      ${outline ? "border-black" : "border-[#1ed760]"}
      ${outline ? "text-black" : "text-white"}
      ${small ? "text-sm" : "text-md"}
      ${small ? "py-1" : "py-3"}
      ${small ? "font-[600]" : "font-semibold"}
      ${small ? "border-[1px]" : "border-2"}
      ${small ? "text-[14px]" : "text-[14px]"}
      ${bgColor && "#242424"}
    `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
          absolute
          left-4
          top-3
        "
        />
      )}
      {label}
    </button>
  );
};

export default Button;
