"use client";
import { RootState } from "@reduxjs/toolkit/query";
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import Ratings from "../Admin/Course/Ratings";
import {
  IoMdCheckmarkCircleOutline,
  IoMdCloseCircleOutline,
} from "react-icons/io";
import CoursePlayer from "../Admin/Course/CoursePlayer";
import { styles } from "../styles/style";
import Link from "next/link";
import CourseContentList from "./CourseContentList";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Payment/CheckoutForm";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  data: any;
  stripePromise: any;
  clientSecret: string;
};

const CourseDetails: FC<Props> = ({ data, clientSecret, stripePromise }) => {
  const { data: userData } = useLoadUserQuery(undefined, {});
  const user = userData?.user;
  const [open, setOpen] = useState(false);
  const discountPercentage =
    (data?.estimatedPrice - data?.price / data?.estimatedPrice) * 100;
  const discountPrecentagePrice = discountPercentage.toFixed(0);

  const isPurchased =
    user && user.courses.find((course) => course._id === data._id);
  const handleOrder = () => {
    setOpen(true);
  };
  return (
    <div>
      <div className="w-[90%] m-auto py-5">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="dark:text-white text-black text-[600] text-[25px] font-Poppins">
              {data?.name}
            </h1>
            {/* <div className="flex items-center">
              <Ratings rating={data?.ratings} />
              <h5 className="text-black dark:text-white">
                {data?.reviews.length}
              </h5>
            </div> */}
            {/* <h5 className="text-black dark:text-white">
              {data?.purchased.length
                ? `${data?.purchased.length} Students`
                : "0 Student"}
            </h5> */}
            <br />
            <h1 className="dark:text-white text-black text-[600] text-[25px] font-Poppins">
              What will you learn from this course?
            </h1>
            <div>
              {data?.benefits.map((benefit: any, index: number) => (
                <div key={index} className="w-full flex 800px:items-start py-2">
                  <div className="w-[15px] mr-1">
                    <IoMdCheckmarkCircleOutline
                      size={20}
                      className="text-black dark:text-white mt-2"
                    />
                  </div>
                  <p className="pl-2 text-black dark:text-white">
                    {benefit?.title}
                  </p>
                </div>
              ))}
              <br />
              <br />
            </div>
            <h1 className="dark:text-white text-black text-[600] text-[25px] font-Poppins">
              What are the prerequisites to learn this course?
            </h1>
            <div>
              {data?.prerequsites.map((prerequisite: any, index: number) => (
                <div key={index} className="w-full flex 800px:items-start py-2">
                  <div className="w-[15px] mr-1">
                    <IoMdCheckmarkCircleOutline
                      size={20}
                      className="text-black dark:text-white mt-2"
                    />
                  </div>
                  <p className="pl-2 text-black dark:text-white">
                    {prerequisite.title}
                  </p>
                </div>
              ))}
              <br />
              <br />
            </div>
            <div>
              <h1 className="dark:text-white text-black text-[600] text-[25px] font-Poppins">
                Course overview
              </h1>
              <CourseContentList data={data?.courseData} />
            </div>
            <br />
            <br />
            {/* {course description} */}
            <div className="w-full">
              <h1 className="dark:text-white text-black text-[600] text-[25px] font-Poppins">
                Course details
              </h1>
              <p className="pl-2 text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white">
                {data?.description}
              </p>
            </div>
            <br />
            <br />
            <div className="w-full 800px:flex items-center">
              <Ratings rating={data?.ratings} />
              <div className="mb-2 800px:mb-[unset]" />
              <h5 className="dark:text-white text-black text-[600] text-[25px] font-Poppins">
                {Number.isInteger(data?.ratings)
                  ? data?.ratings.toFixed(1)
                  : data?.ratings.toFixed(2)}
                Course Rating . {data?.ratings?.length} Reviews
              </h5>
            </div>
            <br />
            <br />
            {data?.reviews ? (
              [...data?.reviews].reverse().map((review: any, index: number) => (
                <div key={index} className="w-full pb-4">
                  <div className="flex">
                    <div className="w-[50px] h-[50px]">
                      <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                        <h1 className="dark:text-white text-black text-[600] text-[25px] font-Poppins">
                          {review.user?.name.slice(0, 2)}
                        </h1>
                      </div>
                    </div>
                    <div className="hidden 800px:block pl-2">
                      <div className="flex items-center">
                        <h5 className="text-[18px] pr-2 text-black dark:text-white">
                          {review.user?.name}
                        </h5>
                        <Ratings rating={review.rating} />
                      </div>
                      <p className="text-black dark:text-white">
                        {review.comment}
                      </p>
                    </div>
                    <div className="flex 800px:hidden items-center pl-2">
                      <h5 className="text-[18px] pr-2 text-black dark:text-white">
                        {review.user?.name}
                      </h5>
                      <Ratings rating={review.rating} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
          <div className="w-full 800px:w-[35%] relative">
            <div className=" top-[100px] left-0 z-[50] w-full">
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
              <div className="flex items-center">
                <h1 className="text-black dark:text-white text-[25px] pt-5">
                  {data?.price === 0 ? "Free" : data?.price + "$"}
                </h1>
                <h5 className="text-black dark:text-white text-[25px] pl-3 mt-2 opacity-80 line-through">
                  {data?.estimatedPrice} $
                </h5>
                <h4 className="text-black dark:text-white pl-5 pt-5 text-[22px]">
                  {discountPrecentagePrice} off
                </h4>
              </div>
              <div className="flex items-center">
                {isPurchased ? (
                  <Link
                    className={`${styles.button} !w-[180px] font-Poppins my-3 cursor-pointer !bg-[crimson]`}
                    href={`course-access/${data?._id}`}
                  >
                    Enter to course
                  </Link>
                ) : (
                  <div
                    className={`${styles.button} !w-[180px] font-Poppins my-3 cursor-pointer !bg-[crimson`}
                    onClick={handleOrder}
                  >
                    {" "}
                    Buy now {data?.price} ${" "}
                  </div>
                )}
              </div>
              <br />
              <p className="pb-1 text-black dark:text-white">
                * Source code included
              </p>
              <p className="pb-1 text-black dark:text-white">
                * Full lifetime access
              </p>
              <p className="pb-1 text-black dark:text-white">
                * Certificate of completion
              </p>
              <p className="pb-1 text-black dark:text-white">
                * Premium support
              </p>
            </div>
          </div>
        </div>

        <>
          {open ? (
            <div className="w-full h-screen absolute top-6 left-0 z-50 flex items-center justify-center">
              <div className="w-[500px]  bg-white rounded-xl shadow p-3">
                <div className="w-full flex justify-end">
                  <IoMdCloseCircleOutline
                    size={40}
                    className="text-black cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                {stripePromise && clientSecret ? (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm setOpen={setOpen} data={data} />
                  </Elements>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      </div>
    </div>
  );
};

export default CourseDetails;
