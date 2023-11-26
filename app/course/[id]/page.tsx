"use client";
import CourseDetailsPage from "@/app/components/Course/CourseDetailsPage";
import React from "react";

const page = ({ params }: any) => {
  console.log("params", params);
  return (
    <div>
      <CourseDetailsPage id={params.id} />
    </div>
  );
};

export default page;
