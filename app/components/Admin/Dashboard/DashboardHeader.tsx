"use client";
import ThemeSwitcher from "@/app/utils/ThemeSwitcher";
import React, { FC, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

type Props = {
  open?: boolean;
  setOpen?: (data: boolean) => void;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0 ">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => (setOpen ? setOpen(!open) : "")}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer text-black dark:text-slate-300" />
        <span className="absolute -top-2 -right-2 bg-blue-200 rounded-full w-[20px] h-[20px] text-[12px] text-black flex items-center justify-center">
          3
        </span>
      </div>
      {open && (
        <div className="w-[350px] h-[50vh] bg-white dark:bg-[#111C43] shadow-xl absolute top-16 z-10 rounded">
          <h5 className="text-center font-Poppins text-[20px] text-black dark:text-white p-3">
            Notifications
          </h5>
          <div className="border-b border-b-[#0000000f] font-Poppins bg-[#00000013] dark:bg-[#2d3a4ea1] dark:border-b=[#ffffff47">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-black dark:text-white">
                {" "}
                New questions received
              </p>
              <p className="text-black dark:text-white cursor-pointer">
                Marked as read
              </p>
            </div>
            <p className="px-2 text-white dark:text-black">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="p-2 text-[14px] text-white dark:text-black">
              5 days ago
            </p>
          </div>
          <div className="border-b border-b-[#0000000f] font-Poppins bg-[#00000013] dark:bg-[#2d3a4ea1] dark:border-b=[#ffffff47">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-black dark:text-white">
                {" "}
                New questions received
              </p>
              <p className="text-black dark:text-white cursor-pointer">
                Marked as read
              </p>
            </div>
            <p className="px-2 text-white dark:text-black">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="p-2 text-[14px] text-white dark:text-black">
              5 days ago
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
