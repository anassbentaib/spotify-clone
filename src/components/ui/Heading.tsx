import { Link } from "@chakra-ui/react";
import React from "react";

interface HeadingProps {
  title?: string;
  LargeTitle?: string;
  subTitle?: string;
}
const Heading: React.FC<HeadingProps> = ({ title, subTitle, LargeTitle }) => {
  return (
    <div className="w-full">
      <div>
        <h5 className="font-bold text-[20px] 2xl:text-[40px] xl:text-[40px] md:text-[30px] sm:text-[25px]">
          {LargeTitle}
        </h5>
      </div>
      <div>
        <Link className="font-bold text-[13px] 2xl:text-[25px] xl:text-[25px] md:text-[19px] sm:text-[15px]">
          {title}
        </Link>
      </div>
      <div>
        <h5 className="text-[21px] font-bold">{subTitle}</h5>
      </div>
    </div>
  );
};

export default Heading;
