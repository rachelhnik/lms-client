import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="border border-[#0000000e] dark:border-[#ffffff1e] mt-4" />
      <br />

      <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
        <div className="gird grid-cols-1 800px:flex 800px:justify-between gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] dark:text-white text-black">
              About
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-balck dark:text-gray-300 dark:hover:text-white text-base"
                >
                  Our story
                </Link>
              </li>
              <li>
                <Link
                  href="/policy"
                  className="text-balck dark:text-gray-300 dark:hover:text-white text-base"
                >
                  Privacy & Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-balck dark:text-gray-300 dark:hover:text-white text-base"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] dark:text-white text-black">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/courses"
                  className="text-balck dark:text-gray-300 dark:hover:text-white text-base"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-balck dark:text-gray-300 dark:hover:text-white text-base"
                >
                  My account
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-balck dark:text-gray-300 dark:hover:text-white text-base"
                >
                  Course Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] dark:text-white text-black">
              Social links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-balck dark:text-gray-300 dark:hover:text-white text-base"
                >
                  Youtube
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-balck dark:text-gray-300 dark:hover:text-white text-base"
                >
                  Github
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-balck dark:text-gray-300 dark:hover:text-white text-base"
                >
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] dark:text-white text-black">
              Contact info
            </h3>
            <ul className="space-y-4">
              <li>
                <p className="text-balck dark:text-gray-300 dark:hover:text-white text-base">
                  Call us :01111111
                </p>
              </li>
              <li>
                <p className="text-balck dark:text-gray-300 dark:hover:text-white text-base">
                  Address: 5655 College Ave,Oakland,Califonia,United States
                </p>
              </li>
              <li>
                <p className="text-balck dark:text-gray-300 dark:hover:text-white text-base">
                  Mail us : nerdemy@gmail.com
                </p>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-center text-black dark:text-white text-[11px] mt-6">
          Copyright © 2023 Elearning | All Rights Reserved
        </p>
      </div>
      <br />
    </footer>
  );
};

export default Footer;
