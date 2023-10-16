"use client";
import Link from "next/link";
import React, { FC } from "react";
export const NavItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "faq",
  },
];
interface Props {
  activeItem: number;
  isMobile: boolean;
}
const NavItems: FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden 800px:flex">
        {NavItemsData.map((item, index) => (
          <Link href={`${item.url}`} key={index} passHref>
            <span
              className={`${
                activeItem === index
                  ? "dark:text-[#37a39a] text-[crimson]"
                  : "text-slate-600 dark:text-slate-400"
              } text-[18px] font-Poppins font-[400] px-6`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>
      {isMobile && (
        <div className="800px:hidden mt-6">
          <div className="w-full text-center">
            {NavItemsData.map((item, index) => (
              <Link href={`${item.url}`} key={index} passHref>
                <span
                  className={`${
                    activeItem === index
                      ? "dark:text-[#37a39a] text-[crimson]"
                      : "text-slate-600  dark:text-slate-400"
                  } block text-[18px] font-Poppins font-[400] py-6 px-6`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavItems;
