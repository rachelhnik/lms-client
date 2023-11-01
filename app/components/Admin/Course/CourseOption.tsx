import React, { FC } from "react";
import { IoMdCheckmark } from "react-icons/io";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const CourseOption: FC<Props> = ({ active, setActive }) => {
  const options = [
    "Course Information",
    "Course Option",
    "Course Content",
    "Course Preview",
  ];
  return (
    <div>
      {options.map((option: any, index: number) => (
        <div key={index} className={`w-full flex py-5`}>
          <div
            className={`w-[35px] h-[35px] rounded-full flex items-center justify-center relative ${
              active + 1 > index ? "bg-blue-500" : "bg-[#384766"
            }`}
          >
            <IoMdCheckmark classname="text-[25px]" />
            {index !== options.length && (
              <div
                className={`absolute h-[30px] w-1 bottom-[-100%] ${
                  active + 1 > index ? "bg-blue-500" : "bg-[#384766"
                } `}
              ></div>
            )}
          </div>
          <h5 className={`pl-3 text-[20px] dark:text-white text-black`}>
            {option}
          </h5>
        </div>
      ))}
    </div>
  );
};

export default CourseOption;
