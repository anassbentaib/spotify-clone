import { getCurrentUser } from "@/actions/getCurrectUser";
import Navbar from "../Navbar/page";

interface EmptyStateProps {
  title: String;
  subTitle: String;
}

const EmptyState = ({ title, subTitle }: EmptyStateProps) => {
  const { user } = getCurrentUser();

  return (
    <div>
      <Navbar currentUser={user} />
      <div
        className="
      h-[60vh]
      flex 
      flex-col 
      gap-2 
      justify-center 
      items-center 
    "
      >
        <div className="text-center">
          <h1 className="text-[20px] font-bold text-white mb-[30px]">
            {title}
          </h1>
          <h6 className="text-[20px] font-light text-[#a7a7a7a7] mt-[6px]">
            {subTitle}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
