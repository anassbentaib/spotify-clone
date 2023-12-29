import { ChevronLeft, ChevronRight } from "lucide-react";

const NavigationButton = () => {
  return (
    <>
      <div className="flex items-center md:w-[27px] sm:w-[20px] xl:w-[33px]  2xl:w-[33px]   w-[20px] md:h-[27px] sm:h-[20px] xl:h-[33px]  2xl:h-[33px] h-[20px] rounded-full opacity-[0.8] bg-black mr-[8px]  justify-center cursor-pointer ">
        <ChevronLeft className="color-white opacity-[100%] " />
      </div>
      <div className="md:w-[27px] sm:w-[20px] xl:w-[33px]  2xl:w-[33px]   w-[20px] md:h-[27px] sm:h-[20px] xl:h-[33px]  2xl:h-[33px] h-[20px]  rounded-full opacity-[0.8] opacity-8 bg-black flex justify-center items-center cursor-pointer">
        <ChevronRight style={{ color: "white", fontSize: "2rem" }} />
      </div>
    </>
  );
};

export default NavigationButton;
