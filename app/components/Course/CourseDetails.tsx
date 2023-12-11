"use client";
import { RootState } from "@reduxjs/toolkit/query";
import React, { FC, useEffect, useState } from "react";
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
import userProfile from "../../../public/userProfile.png";
import Image from "next/image";

type Props = {
  data: any;
  stripePromise: any;
  clientSecret: string;
  setRoute: (data: string) => void;
  setOpenLogin: (data: boolean) => void;
};

const CourseDetails: FC<Props> = ({
  data,
  clientSecret,
  stripePromise,
  setRoute,
  setOpenLogin,
}) => {
  const { data: userData } = useLoadUserQuery(undefined, {});
  const [user, setUser] = useState<any>();

  const [open, setOpen] = useState(false);
  const discountPercentage =
    ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100;
  const discountPrecentagePrice = discountPercentage.toFixed(0);

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  const isPurchased =
    (user && user?.courses?.find((course) => course._id === data._id)) ||
    data.userId === user?._id;

  const handleOrder = () => {
    if (user) {
      setOpen(true);
    } else {
      setRoute("Login");
      setOpenLogin(true);
    }
  };

  return (
    <div>
      <div className="w-[90%] m-auto py-5">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="dark:text-white text-black text-[600] text-[25px] font-Poppins">
              {data?.name}
            </h1>
            <div className="flex">
              <div className="flex items-center mt-2">
                <Ratings rating={data?.ratings} />
              </div>
              <h5 className="text-black dark:text-white mt-2">
                {data?.purchased
                  ? `${data?.purchased} ${
                      data?.purchased > 1 ? "Students" : "Student"
                    }`
                  : "0 Student"}
              </h5>
            </div>
            <br />
            <h1 className="dark:text-white text-black text-[600] text-[25px] font-Poppins">
              What will you learn from this course?
            </h1>
            <div>
              {data?.benefits.map((benefit: any, index: number) => (
                <div key={index} className="w-full flex items-center py-2">
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
            </div>
            <h1 className="dark:text-white text-black text-[600] text-[25px] font-Poppins">
              What are the prerequisites to learn this course?
            </h1>
            <div>
              {data?.prerequsites.map((prerequisite: any, index: number) => (
                <div key={index} className="w-full flex items-center py-2">
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

            {data?.reviews ? (
              [...data?.reviews].reverse().map((review: any, index: number) => (
                <div key={index} className="w-full pb-4">
                  <div className="flex">
                    <Image
                      width={40}
                      height={40}
                      alt=""
                      className="rounded-full w-[40px] h-[40px] object-cover"
                      src={
                        review?.user?.avatar
                          ? review?.user.avatar.url
                          : userProfile
                      }
                    />
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
                  {discountPrecentagePrice}% off
                </h4>
              </div>
              <div className="flex items-center">
                {isPurchased ? (
                  <Link
                    className={`${styles.button} !w-[180px] font-Poppins my-3 cursor-pointer !bg-[crimson]`}
                    href={`/course-access/${data?._id}`}
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
                    className="text-gray-400 cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                {stripePromise && clientSecret ? (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm setOpen={setOpen} data={data} user={user} />
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
