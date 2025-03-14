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
  const videoSections: string[] = [
    ...new Set<string>(data?.map((data: any) => data.title)),
  ];

  let totalCount: number = 0;
  const newVisibleSections = new Set(videoSections);

  const toggleSection = (section: string) => {
    setVisibleSections((prevVisibleSections) => {
      const newSections = new Set(prevVisibleSections);
      if (newSections.has(section)) {
        newSections.delete(section);
      } else {
        newSections.add(section);
      }
      return newSections;
    });
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
            {isSectionVisible && (
              <h5 className="text-black dark:text-white">
                {sectionVideosCount}
                {sectionVideosCount === 0 || sectionVideosCount === 1
                  ? "Lesson"
                  : "Lessons"}
                (
                {sectionVideosLength < 60
                  ? sectionVideosLength
                  : sectionContentHours.toFixed(2)}
                {sectionVideosLength < 60
                  ? sectionVideosLength === 0 || sectionVideosLength === 1
                    ? "minute"
                    : "minutes"
                  : "hours"}
                )
              </h5>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;
