"use client";
import { useGetCourseDetailsQuery } from "@/redux/features/Courses/CoursesApi";
import React, { FC, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import CourseDetails from "./CourseDetails";
import Footer from "../Footer/Footer";

type Props = {
  id: string;
};

const CourseDetailsPage: FC<Props> = ({ id }) => {
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={`${data?.course?.name}-Elearnign`}
            description={`Nerdemy is the website for all people around the world to learn coding`}
            keywords={data?.course?.tags}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          <CourseDetails data={data?.course} />
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
