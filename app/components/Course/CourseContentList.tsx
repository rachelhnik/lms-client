import React, { FC, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: (data: number) => void;
};

const CourseContentList: FC<Props> = ({ data }) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );
  console.log("data", data);
  const videoSections: string[] = [
    ...new Set<string>(data?.map((data: any) => data.videoSection)),
  ];

  let totalCount: number = 0;

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(videoSections);
    console.log("new", newVisibleSections.has(section));
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
      setVisibleSections(newVisibleSections);
    } else {
      newVisibleSections.add(section);
      setVisibleSections(newVisibleSections);
    }
  };

  return (
    <div className={`mt-[15px] w-full `}>
      {videoSections.map((section: string, sectionIndex: number) => {
        const isSectionVisible = visibleSections.has(section);

        const sectionVideos = data.filter(
          (item) => item.videoSection === section
        );
        const sectionVideosCount: number = sectionVideos.length;
        const sectionVideosLength: number = sectionVideos.reduce(
          (totalLength: number, item: any) => totalLength + item.videoLength,
          0
        );
        const sectionStartIndex = totalCount;
        totalCount += sectionVideosCount;
        const sectionContentHours: number = sectionVideosLength / 60;
        console.log("VL", sectionVideosLength);

        return (
          <div key={sectionIndex}>
            <div className="w-full flex">
              <div className="w-full flex justify-between items-center">
                <h2 className="dark:text-white text-black text-[22px]">
                  {section}
                </h2>
                <button
                  className="mr-4 cursor-pointer text-black dark:text-white"
                  onClick={() => toggleSection(section)}
                >
                  {isSectionVisible ? (
                    <BiChevronUp size={20} />
                  ) : (
                    <BiChevronDown size={20} />
                  )}
                </button>
              </div>
            </div>
            <h5 className="text-black dark:text-white">
              {sectionVideosCount}
              {sectionVideosCount === 0 || sectionVideosCount === 1
                ? "Lesson"
                : "Lessons"}
              (
              {sectionVideosLength < 60
                ? sectionVideosLength
                : sectionContentHours.toFixed(2)}
              {sectionVideosLength < 60 ? "minutes" : "hours"})
            </h5>
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;
