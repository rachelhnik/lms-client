"use client";

import UsersAnalytics from "../../components/Admin/Analytics/UsersAnalytics";
import CourseAnalytics from "../../components/Admin/Analytics/CourseAnalytics";
import AllCourses from "../../components/Admin/Course/AllCourses";
import DashboardHeader from "../../components/Admin/Dashboard/DashboardHeader";
import AdminSidebar from "../../components/Admin/Sidebar/AdminSidebar";
import Heading from "../../utils/Heading";
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
          <UsersAnalytics isDashboard={false} />
        </div>
      </div>
    </div>
  );
};

export default Page;
