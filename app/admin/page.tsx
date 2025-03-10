"use client";
import { FC, useState } from "react";
import Heading from "../utils/Heading";
import AdminProtected from "../hooks/adminProtected";
import AdminSidebar from "../components/Admin/Sidebar/AdminSidebar";
import { useSelector } from "react-redux";
import DashboardHero from "../components/Admin/Dashboard/DashboardHero";

type Props = {};

const Admin: FC<Props> = () => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div>
      <AdminProtected>
        <Heading
          title="ELearning-admin"
          description="Elearning is a platform to learn from online classes anywhere across the world"
          keywords="computer science, web development, machine learning"
        />
        <div className="flex h-[200vh]">
          <div className="w-[25%] ">
            <AdminSidebar user={user} />
          </div>
          <div className="!w-[100%] ">
            <DashboardHero isDashboard={true} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Admin;
