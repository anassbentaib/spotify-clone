import { PuffLoader } from "react-spinners";

const NoDataFound = () => {
  return (
    <div className="h-[70vh] flex flex-col items-center  justify-center">
      <PuffLoader size={70} color="red" />
    </div>
  );
};

export default NoDataFound;
