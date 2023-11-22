"use client";

import CourseAnalytics from "../../../app/components/Admin/Analytics/CourseAnalytics";
import AllCourses from "../../../app/components/Admin/Course/AllCourses";
import DashboardHeader from "../../../app/components/Admin/Dashboard/DashboardHeader";
import AdminSidebar from "../../../app/components/Admin/Sidebar/AdminSidebar";
import Heading from "../../../app/utils/Heading";
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";

const Page: FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div>
      <Heading
        title="ELearning-admin"
        description="Elearning is a platform to learn from online classes anywhere across the world"
        keywords="computer science, web development, machine learning"
      />
      <div className="flex h-[200vh]">
        <div className="1500px:w-[16%] w-1/3 ">
          <AdminSidebar user={user} />
        </div>
        <div className="w-[100%] ">
          <DashboardHeader />
          <CourseAnalytics />
        </div>
      </div>
    </div>
  );
};

export default Page;
