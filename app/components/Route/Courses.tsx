"use client";
import { useGetAllCoursesUserQuery } from "@/redux/features/Courses/CoursesApi";
import React, { useEffect, useState } from "react";
import CourseCard from "../Admin/Course/CourseCard";

const Courses = () => {
  const { data } = useGetAllCoursesUserQuery({});
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (data) {
      setCourses(data.courses);
    }
  }, [data]);

  return (
    <div>
      <div className="w-[90%] 800px:w-[80%] m-auto mt-[20px]">
        <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-black font-[700] tracking-tight">
          Expand your career
          <span className="text-gradient">Oppotunity</span>
          <br />
          Oppotunity with our courses
        </h1>
        <br />
        <br />
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
          {courses &&
            courses.map((course: any, index: number) => (
              <CourseCard key={index} course={course} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
