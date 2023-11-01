"use client";
import React, { useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOption from "./CourseOption";
import CourseData from "./CourseData";

const CreateCourse = () => {
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
  const [courseContentData, setCourseContentData] = useState({
    title: "",
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
  });
  const [courseData, setCourseData] = useState({});

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
      </div>

      {/* <div className="w-[-20%] mt-[100px]   h-screen fixed top-18 r-0 ">
        <CourseOption active={active} setActive={setActive} />
      </div> */}
    </div>
  );
};

export default CreateCourse;
