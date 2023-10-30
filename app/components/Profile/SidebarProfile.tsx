import { FC } from "react";
import Image from "next/image";
import userProfile from "../../../public/userProfile.png";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineDashboard } from "react-icons/md";

type SidebarProps = {
  user: any;
  avatar: any;
  active: number;
  setActive: (active: number) => void;
  logoutHandler: () => void;
};

const SidebarProfile: FC<SidebarProps> = ({
  user,
  avatar,
  active,
  setActive,
  logoutHandler,
}) => {
  return (
    <div className="w-full">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointe mt-2 ${
          active === 1 ? "dark:bg-slate-700 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={user.avatar ? user.avatar.url || avatar : userProfile}
          alt=""
          width={20}
          height={20}
          className={`800px:w-[20px] 800px:h-[20px] cursor-pointer rounded-full`}
        />
        <h5 className="ml-2 800px:block hidden font-Poppins text-black dark:text-white">
          My account
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointe mt-2 h-[65px] ${
          active === 2 ? "dark:bg-slate-700 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} />
        <h5 className="ml-2 800px:block hidden font-Poppins text-black dark:text-white">
          Change password
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointe mt-2 h-[65px] ${
          active === 3 ? "dark:bg-slate-700 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} />
        <h5 className="ml-2 800px:block hidden font-Poppins text-black dark:text-white">
          Enrolled courses
        </h5>
      </div>
      {user.role === "admin" && (
        <div
          className={`w-full flex items-center px-3 py-4 cursor-pointe mt-2 h-[65px] ${
            active === 5 ? "dark:bg-slate-700 bg-white" : "bg-transparent"
          }`}
          onClick={() => setActive(5)}
        >
          <MdOutlineDashboard size={20} />
          <h5 className="ml-2 800px:block hidden font-Poppins text-black dark:text-white">
            Admin dashboard
          </h5>
        </div>
      )}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointe mt-2 h-[65px] ${
          active === 4 ? "dark:bg-slate-700 bg-white" : "bg-transparent"
        }`}
        onClick={() => logoutHandler()}
      >
        <AiOutlineLogout size={20} />
        <h5 className="ml-2 800px:block hidden font-Poppins text-black dark:text-white">
          Log out
        </h5>
      </div>
    </div>
  );
};

export default SidebarProfile;
