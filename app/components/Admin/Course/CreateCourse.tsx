"use client";
import React, { useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOption from "./CourseOption";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";

const CreateCourse = () => {
  const [active, setActive] = useState<number>(2);
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

  const handleCourseCreate = () => {
    console.log("hello");
  };

  return (
    <div className="w-full flex min-h-screen ">
      <div className="w-[80%]  ">
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

      {/* <div className="w-[-20%] mt-[100px]   h-screen fixed top-18 r-0 ">
        <CourseOption active={active} setActive={setActive} />
      </div> */}
    </div>
  );
};

export default CreateCourse;
