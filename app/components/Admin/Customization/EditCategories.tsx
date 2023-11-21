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

const EditCategories = () => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Category", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayoutData, { isSuccess, error }] = useEditLayoutDataMutation();
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.category);
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
      setCategories((prevCategory) => [...prevCategory, { title: "" }]);
    }
  };

  const areCategoriesUnchanged = (
    originalCategories: any[],
    newCategories: any[]
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoryTitleEmpty = (categories: any[]) => {
    return categories.some((q) => q.title === "");
  };

  const editCategoriesHandler = async () => {
    if (
      !areCategoriesUnchanged(data?.layout.categories, categories) &&
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
                  <AiOutlineDelete
                    className="dark:text-white text-black text-[18px] cursor-pointer ml-2"
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
            ))}
          <br />
          <br />
          <div className="w-[80%] flex items-center">
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newCategoriesHandler}
            />
          </div>
          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] !rounded absolute bottom-12 right-12
            ${
              !areCategoriesUnchanged(data.layout.categories, categories) ||
              !isAnyCategoryTitleEmpty(categories)
                ? "!cursor-pointer !bg-[#42d383]"
                : "!cursor-not-allowed"
            }
            `}
            onClick={
              !areCategoriesUnchanged(data.layout.categories, categories) ||
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
