import React from "react";
import Button from "../Button/Button";

interface CardProps {
  title: string;
  subTitle: string;
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const Card: React.FC<CardProps> = ({ title, subTitle, label, onClick }) => {
  return (
    <div className="p-2">
      <div className="bg-[#242424] rounded-[10px] ">
        <div className="p-5">
          <h3 className="font-[600] text-[16px] mb-2">{title}</h3>
          <p className="font-[500] text-[14px] mb-3">{subTitle}</p>
          <div className="flex items-center">
            <Button label={label} outline onClick={onClick} small />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
