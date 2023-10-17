"use client";

import { FC } from "react";
import Image from "next/image";
import { AiOutlineSearch } from "react-icons/ai";

interface Props {}

const Hero: FC<Props> = () => {
  return (
    <div className="bg-[#ced4da] dark:bg-slate-800 w-full h-screen 1000px:flex items-center">
      <div
        className={`w-full  max-400px:flex-col flex justify-center items-center`}
      >
        <div className="1000px:w-[40%] 1000px:h-screen min-w-[50%]  flex items-start justify-end z-10 m-auto 800px:mt-[180px] rounded ">
          <Image
            src={
              "https://www.distancelearningcollege.co.uk/wp-content/uploads/2022/02/Online-learning-scaled.jpg"
            }
            alt="img"
            width={500}
            height={200}
            className="object-contain max-w-[80%] m-auto h-auto z-[90] mt-10 shadow-2xl rounded-md"
          />
        </div>
        <div className=" max-400px:w-[90%] w-[50%] text-slate-600 min-800px:h-screen  dark:text-slate-400 max-400px:mt-[0px] flex flex-col justify-center items-start m-auto 800px:mt-[220px] mx-3 ">
          <h1 className="text-[40px] 400px:w-[90%] 800px:w-[70%]">
            Improve your online learning experience better instantly
          </h1>
          <br></br>
          <p>We have 40k+ online classes and 100k+ reviews.</p>
          <p> Find your suitable class now.</p>
          <div className="mt-4 flex 400px:min-w-[300px]">
            <input
              placeholder="Search classes"
              className="w-[300px] h-14 rounded-s-md p-2 dark:bg-slate-300  light:border-2 text-slate-600 dark:text-slate-600 "
            />
            <button className="h-14 w-10  border-l-2 border-blue dark:bg-slate-300 light:border-2 bg-white text-slate-600 dark:text-slate-600 rounded-e-md focus:ring-4 focus:ring-inset focus:ring-darkBlue ">
              <AiOutlineSearch className="text-[30px] text-center mt-2 ml-1" />
            </button>
          </div>
          <div className="max-400px:flex-col flex mt-2">
            <p>500K+ people already trusted us.</p>
            <p className="text-green-600">View courses</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
