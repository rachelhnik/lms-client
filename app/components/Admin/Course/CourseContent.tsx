"use client";
import React, { FC, useState } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BiPencil, BiSkipNextCircle } from "react-icons/bi";
import { BsLink45Deg } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { styles } from "../../styles/style";
import toast from "react-hot-toast";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: () => void;
};

const CourseContent: FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    courseContentData && Array(courseContentData.length).fill(false)
  );

  console.log("i", courseContentData);
  const [activeSection, setActiveSection] = useState(1);
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleCollapseToggle = (index: number) => {
    const updatedCollapse = [...isCollapsed];
    updatedCollapse[index] = !updatedCollapse[index];
    setIsCollapsed(updatedCollapse);
  };

  const handleRevmoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index] = {
      ...updatedData[index],
      links: [...updatedData[index].links],
    };
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item: any) => {
    console.log(
      "item",
      item.title,
      item.description,
      item.videoUrl,
      item.links[0].title,
      item.links[0].url
    );
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all fields first");
    } else {
      let newVideoSection = "";
      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContentData = {
        title: "",
        description: "",
        videoUrl: "",
        videoThumbnail: "",
        videoSection: newVideoSection,
        suggestion: "",
        links: [
          {
            title: "",
            url: "",
          },
        ],
      };
      setCourseContentData([...courseContentData, newContentData]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all fields first");
    } else {
      setActiveSection(activeSection + 1);
      const newContentData = {
        title: "",
        description: "",
        videoUrl: "",
        videoThumbnail: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [
          {
            title: "",
            url: "",
          },
        ],
      };
      setCourseContentData([...courseContentData, newContentData]);
    }
  };

  const prevBtn = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all fields first");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        {courseContentData.map((item: any, index: any) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;

          return (
            <>
              <div
                className={`w-full bg-[#cdc8c817] p-4 ${
                  showSectionInput ? "mt-10" : "mt-0"
                }`}
              >
                {showSectionInput && (
                  <>
                    <div className="w-full flex items-center">
                      <input
                        type="text"
                        value={item.videoSection}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];

                          updatedData[index].videoSection = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                        className={`text-[20px] text-black dark:text-white font-Poppins cursor-pointer bg-transparent outline-none ${
                          item.videoSection === "untitled section"
                            ? "w-[170px]"
                            : "w-min"
                        }`}
                      />
                      <BiPencil className="text-black dark:text-white cursor-pointer" />
                    </div>
                  </>
                )}
                <div
                  className={`w-full flex items-center justify-between my-0`}
                >
                  {isCollapsed[index] ? (
                    <></>
                  ) : (
                    <>
                      {item.title ? (
                        <p className="font-Poppins dark:text-white text-black">
                          {index + 1}. {item.title}
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                  <div className="flex items-center">
                    <AiOutlineDelete
                      className={`text-black dark:text-white mr-2 text-[20px] ${
                        index > 0 ? "cursor-pointer" : "cursor-no-drop"
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updatedData = [...courseContentData];
                          updatedData.splice(index, 1);
                          setCourseContentData(updatedData);
                        }
                      }}
                    />
                    <MdOutlineKeyboardArrowDown
                      fontSize="large"
                      className={`text-black dark:text-white`}
                      style={{
                        transform: isCollapsed[index]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                      onClick={() => handleCollapseToggle(index)}
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <>
                    <div className="my-3">
                      <label className={`${styles.label}`}>Video Title</label>
                      <input
                        type="text"
                        placeholder="Project plan ..."
                        value={item.title}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];

                          updatedData[index] = {
                            ...updatedData[index],
                            title: e.target.value,
                          };
                          setCourseContentData(updatedData);
                        }}
                        className={`${styles.input}`}
                      />
                    </div>
                    <div className="mb-3">
                      <label className={`${styles.label}`}>Video Url</label>
                      <input
                        type="text"
                        placeholder="https:// ..."
                        value={item.videoUrl}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index] = {
                            ...updatedData[index],
                            videoUrl: e.target.value,
                          };
                          setCourseContentData(updatedData);
                        }}
                        className={`${styles.input}`}
                      />
                    </div>
                    <div className="mb-3">
                      <label className={`${styles.label}`}>
                        Video Description
                      </label>
                      <textarea
                        rows={8}
                        cols={30}
                        placeholder="this course is for ..."
                        value={item.description}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index] = {
                            ...updatedData[index],
                            description: e.target.value,
                          };
                          setCourseContentData(updatedData);
                        }}
                        className={`${styles.input} !h-min pt-2`}
                      />
                    </div>
                    {item.links.map((link: any, linkIndex: number) => (
                      <div className="mb-3 block" key={linkIndex}>
                        <div className="w-full flex items-center justify-center">
                          <label className={`${styles.label}`}>
                            Link {linkIndex + 1}
                          </label>
                          <AiOutlineDelete
                            className={`${
                              linkIndex === 0
                                ? "cursor-no-drop"
                                : "cursor-pointer"
                            } text-black dark:text-white text-[20px]`}
                            onClick={() =>
                              linkIndex === 0
                                ? null
                                : handleRevmoveLink(index, linkIndex)
                            }
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="source code ...(code title)"
                          value={link.title}
                          onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[index] = {
                              ...updatedData[index],
                              links: [...updatedData[index].links],
                            };
                            updatedData[index].links[linkIndex] = {
                              ...updatedData[index].links[linkIndex],
                              title: e.target.value,
                            };

                            setCourseContentData(updatedData);
                          }}
                          className={`${styles.input}`}
                        />
                        <input
                          type="text"
                          placeholder="source url ...(code url)"
                          value={link.url}
                          onChange={(e) => {
                            const updatedData = [...courseContentData];

                            updatedData[index] = {
                              ...updatedData[index],
                              links: [...updatedData[index].links],
                            };
                            updatedData[index].links[linkIndex] = {
                              ...updatedData[index].links[linkIndex],
                              url: e.target.value,
                            };
                            setCourseContentData(updatedData);
                          }}
                          className={`${styles.input}`}
                        />
                      </div>
                    ))}
                    <br />
                    <div className="inline-block mb-4">
                      <p
                        className="flex items-center text-[18px] text-black dark:text-white cursor-pointer"
                        onClick={() => handleAddLink(index)}
                      >
                        <BsLink45Deg /> Add Link
                      </p>
                    </div>
                  </>
                )}
                <br />
                {index === courseContentData.length - 1 && (
                  <div>
                    <p
                      className="flex items-center text-[18px] text-black dark:text-white cursor-pointer"
                      onClick={() => newContentHandler(item)}
                    >
                      <AiOutlinePlusCircle className="mr-2" /> Add New Content
                    </p>
                  </div>
                )}
              </div>
            </>
          );
        })}
        <br />
        <div
          className="flex items-center text-[20px] text-black dark:text-white cursor-pointer"
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className="mr-2" /> Add new section
        </div>
      </form>
      <br />
      <div className="w-full flex items-center justify-center">
        <div
          className="w-full 800px:[w-180px] h-[40px] bg-[#37a39a] mx-2 pt-2  text-center text-white rounded mt-8 cursor-pointer"
          onClick={() => prevBtn()}
        >
          Prev
        </div>
        <div
          className="w-full 800px:[w-180px] h-[40px] bg-[#37a39a] mx-2 pt-2 text-center text-white rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
