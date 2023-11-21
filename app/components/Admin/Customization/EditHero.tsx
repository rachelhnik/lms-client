"use client";
import {
  useEditLayoutDataMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/LayoutApi";
import React, { useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "../../styles/style";
import toast from "react-hot-toast";

const EditHero = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState("");
  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayoutData, { isSuccess, error, isLoading }] =
    useEditLayoutDataMutation();

  useEffect(() => {
    if (data) {
      setImage(data.layout?.banner?.image?.url);
      setTitle(data.layout?.banner?.title);
      setSubtitle(data.layout?.banner?.subtitle);
    }
    if (isSuccess) {
      refetch();
      toast.success("Successfully updated");
    }
    if (error) {
      if ("data" in Error) {
        const errorMsg = Error as any;

        toast.error("Something went wrong");
      }
    }
  }, [data, isSuccess, error]);

  const newInfo =
    data?.layout?.banner?.title !== title ||
    data?.layout?.banner?.subtitle !== subtitle ||
    data?.layout?.banner?.image?.url !== image;

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleEdit = async () => {
    await editLayoutData({
      type: "Banner",
      image,
      title,
      subtitle,
    });
  };

  return (
    <>
      <div className="w-full 1000px:flex flex items-center ">
        <div className="mt-[100px]   1500px:h-[700px] 1100px:h-[500px] mr-[50px] w-full">
          <div className="1000px:w-[100%]  flex  1000px:min-h-screen items-center justify-between pt-[70px] 1000px:pt-[0] z-10">
            <div className="relative flex items-center justify-end mb-[100px]">
              <img
                src={image}
                alt=""
                className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%]  h-auto z-[10]"
              />
              <input
                type="file"
                name=""
                id="banner"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              <label
                htmlFor="banner"
                className="absolute bottom-0 right-0 z-20"
              >
                <AiOutlineCamera className="dark:text-white text-black text-[18px] cursor-pointer" />
              </label>
            </div>
            <div className="1000px:w-[60%]  flex flex-col items-center text-center 1000px:mt-0 1000px:text-left mt-[150px] ">
              <textarea
                className={`text-black dark:text-white  text-[20px] px-3 w-full ] font-Poppins bg-slate-600 rounded-lg`}
                placeholder="Improve your online learning experience better instantly"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                rows={4}
              ></textarea>
              <br />
              <textarea
                className="text-black dark:text-white  text-[20px] px-3 w-full  font-Poppins bg-slate-600 rounded-lg"
                placeholder="Improve your online learning experience better instantly"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                rows={4}
              ></textarea>
              <br />
              <br />
              <br />
              {data?.layout ? (
                <div
                  className={`${
                    styles.button
                  } !w-[100px] !min-h-[40px] dark:text-white text-black bg-[#cccccc34] 
                   ${
                     newInfo
                       ? "cursor-pointer bg-green-400"
                       : "cursor-not-allowed"
                   }`}
                  onClick={() => {
                    newInfo ? handleEdit() : () => null;
                  }}
                >
                  Save
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHero;
