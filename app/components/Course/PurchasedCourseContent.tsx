import { useGetCourseContentQuery } from "../../../redux/features/Courses/CoursesApi";
import React, { useState } from "react";
import Loader from "../Loader/Loader";
import Header from "../Header";
import Heading from "../../../app/utils/Heading";
import CourseContentMedia from "./CourseContentMedia";
import CourseContentList from "./CourseContentList";

type Props = {
  id: string;
  user: any;
};

const PurchasedCourseContent = ({ id, user }: Props) => {
  const {
    isLoading,
    data: courseData,
    refetch,
  } = useGetCourseContentQuery(id, { refetchOnMountOrArgChange: true });
  const data = courseData?.content as any;
  const [activeVideo, setActiveVideo] = useState(0);
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  console.log("dara", data);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            activeItem={1}
            open={open}
            setOpen={setOpen}
            route={route}
            setRoute={setRoute}
          />
          <div className="w-full grid 800px:grid-cols-10">
            <Heading
              title={data[activeVideo]?.title}
              description="anything"
              keywords={data[activeVideo]?.tags}
            />
            <div className="col-span-7">
              <CourseContentMedia
                data={data}
                id={id}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                user={user}
                refetch={refetch}
              />
            </div>
            <div className="hidden 800px:block 800px:col-span-3">
              <CourseContentList
                data={data}
                setActiveVideo={setActiveVideo}
                activeVideo={activeVideo}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PurchasedCourseContent;
