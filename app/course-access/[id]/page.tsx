"use client";
import PurchasedCourseContent from "@/app/components/Course/PurchasedCourseContent";
import Loader from "@/app/components/Loader/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  params: any;
};
const Page = ({ params }: Props) => {
  const id = params.id;
  const { isLoading, error, data, refetch } = useLoadUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data) {
      const isPurchased =
        data?.user?.role === "admin" ||
        data?.user?.courses?.find((course) => course._id === id);

      if (!isPurchased) redirect("/");
    }
    if (error) redirect("/");
  }, [error, data]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <PurchasedCourseContent id={id} user={data.user} />
        </div>
      )}
    </>
  );
};

export default Page;
