import {
  useEditLayoutDataMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/LayoutApi";
import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { styles } from "../../styles/style";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";

const EditCategories = () => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Category", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayoutData, { isSuccess, error }] = useEditLayoutDataMutation();
  const [categories, setCategories] = useState<any[]>([]);
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (data) {
      setCategories(data?.layout?.category);
    }
    if (isSuccess) {
      refetch();
      toast.success("Category updated successfully");
    }
    if (error) {
      if ("data" in Error) {
        const errorMsg = Error as any;
        toast.error("Something went wrong");
      }
    }
  }, [data, isSuccess, error]);

  const handleCategoriesAdd = (id: any, value: string) => {
    setCategories((previousCategories) =>
      previousCategories.map((category) =>
        category._id === id ? { ...category, title: value } : category
      )
    );
  };

  const newCategoriesHandler = () => {
    if (categories[categories.length - 1].title === "") {
      toast.error("Category title cannot be empty");
    } else {
      setCategories((prevCategory) => [
        ...prevCategory,
        { title: "", userId: user._id },
      ]);
    }
  };

  const areCategoriesUnchanged = (
    originalCategories: any[],
    newCategories: any[]
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoryTitleEmpty = (categories: any[]) => {
    return categories?.some((q) => q?.title === "");
  };

  const editCategoriesHandler = async () => {
    if (
      !areCategoriesUnchanged(data?.layout?.categories, categories) &&
      !isAnyCategoryTitleEmpty(categories)
    ) {
      await editLayoutData({
        type: "Category",
        categories,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px] text-center  ">
          <h1 className={`${styles.title}`}>All categories</h1>
          <div>
            {categories &&
              categories.map((category: any, index: number) => (
                <div key={index}>
                  <div className="flex items-center justify-center w-full">
                    <input
                      className={`${styles.input} !w-[80%] !border-none !text-[20px]`}
                      value={category.title}
                      onChange={(e) => {
                        handleCategoriesAdd(category._id, e.target.value);
                      }}
                      placeholder="Enter category title ..."
                    />
                    <div className="w-6">
                      <AiOutlineDelete
                        className={`dark:text-white text-black text-[18px] ml-2 cursor-pointer  ${
                          category.original === true ||
                          category?.userId !== user._id
                            ? "hidden "
                            : ""
                        }`}
                        onClick={() => {
                          setCategories((previouseCategories: any) =>
                            previouseCategories.filter(
                              (i: any) => i._id !== category._id
                            )
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}

            <div className=" w-[80%] flex 800px:ml-20  mt-2  items-center">
              <IoMdAddCircleOutline
                className="dark:text-white text-black text-[25px] cursor-pointer"
                onClick={newCategoriesHandler}
              />
            </div>
          </div>
          {/* <div
            className={`${styles.button} !bg-[#42d383] !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] !rounded fixed bottom-4 left-100
            
            `}
            onClick={newCategoriesHandler}
          >
            Add
          </div> */}
          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] !rounded fixed bottom-4 right-12
            ${
              !areCategoriesUnchanged(data?.layout?.categories, categories) ||
              !isAnyCategoryTitleEmpty(categories)
                ? "!cursor-pointer !bg-[#42d383]"
                : "!cursor-not-allowed"
            }
            `}
            onClick={
              !areCategoriesUnchanged(data?.layout?.categories, categories) ||
              !isAnyCategoryTitleEmpty(categories)
                ? () => editCategoriesHandler()
                : () => {}
            }
          >
            Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;
