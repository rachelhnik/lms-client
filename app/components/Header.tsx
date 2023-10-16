"use client";

import Link from "next/link";
import { FC, useState } from "react";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";

interface Props {
  open: boolean;
  setOpen: (data: boolean) => void;
  activeItem: number;
}

const Header: FC<Props> = ({ activeItem, setOpen }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

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
            ? " dark:bg-opacity-50 dark:bg-slate-800 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-[#ced4da] fixed top-0 left-0 w-full h-[80px] z-[80] border-b border-slate-400 dark:border-[#ffffff1c]"
            : "w-full border-b  dark:bg-slate-800 dark:border-gray border-slate-400 dark:border-[#ffffff1c] h-[80px] bg-[#ced4da] z-[80] dark:shadow"
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
              <HiOutlineUserCircle
                size={25}
                onClick={() => {
                  setOpen(true);
                }}
                className="cursor-pointer text-slate-600 dark:text-slate-400  800px:ml-6"
              />
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
      </div>
      {openSidebar && (
        <div
          className="fixed w-full h-screen top-0 left-0 z-[99999]"
          onClick={handleClose}
          id="screen"
        >
          <div className="w-[50%] fixed z-[9999999999] h-screen dark:border-l-[0.1px] border-l-2 bg-[#ced4da] border-slate-400 dark:bg-slate-800 top-0 right-0">
            <NavItems activeItem={activeItem} isMobile={true} />
            <HiOutlineUserCircle
              size={25}
              onClick={() => {
                setOpen(true);
              }}
              className="cursor-pointer text-slate-600 dark:text-slate-400 m-auto mt-6"
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
  );
};

export default Header;
