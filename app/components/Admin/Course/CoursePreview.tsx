import React, { FC, useState } from "react";
import CoursePlayer from "./CoursePlayer";
import { styles } from "../../styles/style";
import Ratings from "./Ratings";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: () => void;
};

const CoursePreview: FC<Props> = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
}) => {
  const discountPercentage =
    ((courseData.estimatedPrice - courseData.price) /
      courseData.estimatedPrice) *
    100;
  const discountPercentagePrice = discountPercentage.toFixed(2);
  const prevBtn = () => {
    setActive(active - 1);
  };
  const createCourse = () => {
    handleCourseCreate();
  };
  return (
    <div className="w-[90%] m-auto py-5 mb-5">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            title={courseData.title}
            videoUrl={courseData.CourseContent[0].videoUrl}
          />
        </div>
        <div className=" flex items-center">
          <h1 className="pt-5 text-[25px]">
            {courseData.price === "0" ? "Free" : courseData.price + "$"}
          </h1>
          <h5 className="pl-2 text-[20px] mt-2 line-through opacity-80">
            {courseData.estimatedPrice} $
          </h5>
          <h4 className="pl-5 pt-4 text-[22px]">
            {discountPercentagePrice}% Off
          </h4>
        </div>
        <div className="flex items-center">
          <div
            className={`${styles.button} !w-[180px] my-3 font-Poppins bg-[crimson] cursor-not-allowed`}
          >
            Buy now {courseData.price} $
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            name=""
            id=""
            placeholder="discount code ..."
            className={`${styles.input} 1500px:!w-[50%] 1100px:w-[60%] ml-3 !mt-0`}
          />
          <div
            className={`${styles.button} !w-[120px] my-3 ml-4 font-Poppins cursor-pointer`}
          >
            Apply
          </div>
        </div>
        <p className="pb-1">* Source code include</p>
        <p className="pb-1">* Full lifetime access</p>
        <p className="pb-1">* Certificate of Completion</p>
        <p className="pb-3 800px:pb-1"> * Premium support</p>
      </div>
      <div className="w-full">
        <div className="w-full 800px:pr-5">
          <h1 className="text-[25px] font-Poppins font-[600]">
            {courseData.name}
          </h1>
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center">
              <Ratings rating={0} />
              <h5>0 review</h5>
            </div>
            <h5>0 student</h5>
          </div>
          <br />
          <h1 className="text-[25px] fonts-Poppins font-[600]">
            What will you learn from this course ?
          </h1>
        </div>
        {courseData.benefits.map((benefit: any, index: number) => (
          <div className="w-full flex 800px:items-center py-2" key={index}>
            <div className="w-15px mr-1">
              <IoMdCheckmarkCircleOutline size={20} />
            </div>
            <p className="pl-2">{benefit.title}</p>
          </div>
        ))}
        <br />
        <br />
        {courseData.preRequsites.map((prerequisite: any, index: number) => (
          <div className="w-full flex 800px:items-center py-2" key={index}>
            <div className="w-15px mr-1">
              <IoMdCheckmarkCircleOutline size={20} />
            </div>
            <p className="pl-2">{prerequisite.title}</p>
          </div>
        ))}
        <br />
        <br />
        <div className="w-full">
          <h1 className="text-[25px] font-Poppins font-[600]">
            Course Details
          </h1>
          {courseData.description}
        </div>
        <br />
        <br />
      </div>
      <div className="w-full flex items-center justify-center">
        <div
          className="w-full 800px:[w-180px] h-[40px] bg-[#37a39a] mx-2 pt-2  text-center text-white rounded mt-8 cursor-pointer"
          onClick={() => prevBtn()}
        >
          Prev
        </div>
        <div
          className="w-full 800px:[w-180px] h-[40px] bg-[#37a39a] mx-2 pt-2 text-center text-white rounded mt-8 cursor-pointer"
          onClick={() => createCourse()}
        >
          Create
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
