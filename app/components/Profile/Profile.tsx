import { FC, useState } from "react";
import SidebarProfile from "./SidebarProfile";
import { useLogoutQuery } from "../../../redux/features/Auth/authApi";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import ProfileInfo from "./ProfileInfo";
import PasswordChange from "./PasswordChange";
import Link from "next/link";
import Admin from "@/app/admin/page";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(false);
  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const logoutHandler = async () => {
    setActive(4);
    signOut();
    setLogout(true);
    redirect("/");
  };
  if (typeof window !== undefined) {
    let window: any;
    window?.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }
  return (
    <div className="w-[85%] mx-auto flex border-slate-800 ">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-slate-100 border-slate-800 border-[1px] bg-opacity-90 border-[#ffffff1d] rounded-lg shadow-sm mt-[80px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px]`}
      >
        <SidebarProfile
          user={user}
          active={active}
          setActive={setActive}
          avatar={avatar}
          logoutHandler={logoutHandler}
        />
      </div>
      {active === 1 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ProfileInfo avatar={avatar} user={user} />
        </div>
      )}
      {active === 2 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <PasswordChange />
        </div>
      )}
      {active === 5 && <Link href={"/admin"} />}
    </div>
  );
};

export default Profile;
