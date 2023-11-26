import React, { FC } from "react";
import Image from "next/image";
import Ratings from "../Admin/Course/Ratings";

type Props = {
  review: any;
};

const ReviewCard: FC<Props> = ({ review }) => {
  return (
    <div className="w-full h-max pb-4 dark:bg-slate-500  dark:bg-opacity-[0.2] border border-[#00000028] dark:border-[#ffffff1d] backdrop-blur shadow-[bg-slate-400]">
      <div className="flex flex-col w-full">
        <Image
          src={review.avatar}
          alt=""
          width={50}
          height={50}
          className="w-[50px] h-[50px] rounded-full object-cover"
        />
        <div className="800px:flex justify-between w-full hidden">
          <div className="pl-4">
            <h5 className="text-black dark:text-white text-[20px]">
              {review.name}
            </h5>
            <h6 className="text-black dark:text-white text-[16px]">
              {review.profession}
            </h6>
          </div>
          <Ratings rating={review.ratings} />
        </div>
        <div className="800px:hidden justify-between w-full flex flex-col">
          <div className="pl-4">
            <h5 className="text-[20px] text-black dark:text-white">
              {review.name}
            </h5>
            <h6 className="text:black dark:text-white text-16px">
              {review.profession}
            </h6>
            <Ratings rating={review.ratings} />
          </div>
        </div>
        <p className="text-black dark:text-white pt-2 px-2 font-Poppins">
          {review.comment}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
