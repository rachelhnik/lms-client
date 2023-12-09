"use client";

import Link from "next/link";
import { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import Login from "./Auth/Login";
import CustomModal from "../utils/CustomModal";
import SignUp from "./Auth/Signup";
import Verification from "./Auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import userProfile from "../../public/userProfile.png";
import { useSession } from "next-auth/react";
import {
  useLogoutQuery,
  useSocialAuthMutation,
} from "@/redux/features/Auth/authApi";
import { isUint16Array } from "util/types";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
interface Props {
  open: boolean;
  setOpen: (data: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
}

const Header: FC<Props> = ({ activeItem, open, setOpen, route, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useSession();
  const [logout, setLogout] = useState(false);
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {});
  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });

  useEffect(() => {
    if (!isLoading) {
      if (!userData) {
        if (data) {
          socialAuth({
            email: data.user?.email,
            name: data.user?.name,
            avatar: data.user?.image,
          });
          refetch();
        }
      }
      if (isSuccess) {
        toast.success("Login successfully");
      }
      if (data === null && !userData) {
        setLogout(true);
      }
    }
  }, [data, user, isLoading]);

  if (typeof window !== undefined) {
    let window: any;
    window?.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = () => {
    setOpenSidebar(false);
  };
  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? " dark:bg-opacity-50 dark:bg-slate-800 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-white fixed top-0 left-0 w-full h-[80px] z-[80] border-b border-slate-400 dark:border-[#ffffff1c]"
            : "w-full border-b  dark:bg-slate-800 dark:border-gray border-slate-400 dark:border-[#ffffff1c] h-[80px] bg-white z-[80] dark:shadow"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href={"/"}
                className=" dark:text-slate-400 text-slate-600 font-Poppins font-[500] text-[25px]"
              >
                ELearning
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {userData ? (
                <Link href={"/profile"}>
                  <Image
                    src={user.avatar ? user.avatar.url : userProfile}
                    alt=""
                    width={25}
                    height={25}
                    className="w-[30px] h-[30px] rounded-full cursor-pointer ml-3"
                    style={{
                      border: activeItem === 6 ? "2px solid #ffc107" : "",
                    }}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  ß
                  onClick={() => {
                    setOpen(true);
                    setRoute("Login");
                  }}
                  className="cursor-pointer text-slate-600 dark:text-slate-400  800px:ml-6"
                />
              )}

              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  onClick={() => setOpenSidebar(true)}
                  size={25}
                  className="cursor-pointer text-slate-600 ml-6 dark:text-slate-400"
                />
              </div>
            </div>
          </div>
        </div>
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[50%] fixed z-[9999999999] h-screen dark:border-l-[0.1px] border-l-2 bg-white border-slate-400 dark:bg-slate-800 top-0 right-0">
              <NavItems activeItem={activeItem} isMobile={true} />
              <Image
                src={
                  userData?.user?.avatar
                    ? userData?.user.avatar.url
                    : "../../public/userProfile.png"
                }
                height={40}
                width={40}
                alt=""
                onClick={() => {
                  setOpen(true);
                }}
                className="cursor-pointer text-slate-600 dark:text-slate-400 rounded-full m-auto mt-6"
              />

              <br />
              <br />
              <p className="fixed bottom-0 text-[12px] ml-6 text-black dark:text-slate-400">
                Copyright © 2023 Elearning
              </p>
            </div>
          </div>
        )}
      </div>
      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              setOpen={setOpen}
              open={open}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
              refetch={refetch}
            />
          )}
        </>
      )}
      {route === "Sign-Up" && (
        <>
          {open && (
            <CustomModal
              setOpen={setOpen}
              open={open}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}
        </>
      )}
      {route === "Verification" && (
        <>
          {open && (
            <CustomModal
              setOpen={setOpen}
              open={open}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
