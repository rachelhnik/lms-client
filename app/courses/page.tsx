"use client";
import { useGetAllCoursesUserQuery } from "@/redux/features/Courses/CoursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/LayoutApi";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import { styles } from "../components/styles/style";
import CourseCard from "../components/Admin/Course/CourseCard";

const Page = () => {
  const params = useSearchParams();
  const search = params?.get("title");
  const { data, isLoading } = useGetAllCoursesUserQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery("Category", {});
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (category === "All") {
      setCourses(data?.courses);
    } else if (category !== "All") {
      setCourses(
        data?.courses.filter((course) => course.categories === category)
      );
    }
    if (search) {
      setCourses(
        data?.courses.filter((course) =>
          course.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [data, category]);

  const categories = categoriesData?.layout.category;
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          <div className="w-[95%] 800px:w-[85%] m-auto min-h-[70vh]">
            <Heading
              title="All courses - Nerdemy Elearning"
              description="Nerdemy Elearning is a programming community"
              keywords="programming community, coding, expert insights"
            />
            <br />
            <div className="flex w-full items-center flex-wrap">
              <div
                className={`h-[35px] ${
                  category === "All" ? "bg-[crimson]" : "bg-[#5050cb]"
                } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                onClick={() => setCategory("All")}
              >
                All
              </div>
              {categories &&
                categories.map((categorydata: any, index: number) => (
                  <div key={index}>
                    <div
                      className={`h-[35px] ${
                        category === categorydata.title
                          ? "bg-[crimson]"
                          : "bg-[#5050cb]"
                      } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                      onClick={() => setCategory(categorydata.title)}
                    >
                      {categorydata.title}
                    </div>
                  </div>
                ))}
            </div>
            {courses && courses.length === 0 && (
              <p
                className={`${styles.label} justify-center min-h-[50vh] flex items-center`}
              >
                {search
                  ? "No courses found!"
                  : "No courses found in this category.Please try another one"}
              </p>
            )}
            <br />
            <br />
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
              {courses &&
                courses.map((coursedata: any, index: number) => (
                  <CourseCard key={index} course={coursedata} />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
