"use client";
import React, { useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOption from "./CourseOption";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useCreateCourseMutation } from "@/redux/features/Courses/CoursesApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

const CreateCourse = () => {
  const [createCourse, { isLoading, isSuccess, error }] =
    useCreateCourseMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("course created successfully");
      redirect("/admin/all-courses");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error("something went wrong");
      }
    }
  }, [isSuccess, isLoading]);

  const [active, setActive] = useState<number>(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: 0,
    thumbnail: "",
    tags: "",
    level: "",
    demoUrl: "",
    estimatedPrice: 0,
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [preRequsites, setPrerequsites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      title: "hello",
      description: "",
      videoUrl: "",
      videoThumbnail: "",
      videoSection: "untitled section",
      suggestion: "",
      links: [
        {
          title: "",
          url: "",
        },
      ],
    },
  ]);
  const [courseData, setCourseData] = useState({});
  const handleSubmit = () => {
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    const formattedPrerequsites = preRequsites.map((prerequsite) => ({
      title: prerequsite.title,
    }));
    const formattedCourseContentData = courseContentData.map(
      (courseContent) => ({
        title: courseContent.title,
        description: courseContent.description,
        videoUrl: courseContent.videoUrl,
        videoSection: courseContent.videoSection,
        links: courseContent.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
      })
    );
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      thumbnail: courseInfo.thumbnail,
      tags: courseInfo.tags,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      estimatedPrice: courseInfo.estimatedPrice,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      preRequsites: formattedPrerequsites,
      CourseContent: formattedCourseContentData,
    };
    setCourseData(data);
  };

  const handleCourseCreate = async (e: any) => {
    const data = courseData;
    if (!isLoading) {
      await createCourse(data);
    }
  };

  return (
    <div className="w-full flex justify-between min-h-screen mt-20 ">
      <div className="w-[80%] mr-4 ">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={preRequsites}
            setPrerequsities={setPrerequsites}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
          />
        )}
      </div>

      <div
        className={`${
          window.innerWidth < 800 ? "hidden" : ""
        } w-[-20%]    h-screen  top-18 r-0 mx-3 mt-10 align-end`}
      >
        <CourseOption active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;
