import React, { useState } from "react";
import CoursePlayer from "../Admin/Course/CoursePlayer";
import { styles } from "../styles/style";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import Image from "next/image";

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (data: number) => void;
  user: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const isReviewsExits = data?.reviews?.find(
    (review) => review.user._id === user._id
  );

  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="flex items-center justify-between my-3 w-full">
        <div
          className={`${
            styles.button
          } !min-h-[40px] mx-1 !rounded-md !w-[unset]  !py-[unset] ${
            data.length - 1 == activeVideo && "!cursor-no-drop opacity-[0.8]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? activeVideo : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft />
          Prev Lesson
        </div>
        <div
          className={`${
            styles.button
          } mx-1 !min-h-[40px] !rounded-md !w-[unset] !py-[unset] ${
            data.length - 1 == activeVideo && "!cursor-no-drop opacity-[0.8]"
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          Next Lesson
          <AiOutlineArrowRight />
        </div>
      </div>
      <h1 className="text-[25px] pt-2 font-600 text-black dark:text-white">
        {data[activeVideo]?.title}
      </h1>
      <br />
      <div className="w-full flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`800px:text-20px cursor-pointer ${
              activeBar === index ? "text-red-500" : ""
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text-black dark:text-white text-[18px] whitespace-pre-line mb-3">
          {data[activeVideo]?.description}
        </p>
      )}
      {activeBar === 1 && (
        <div>
          {data[activeVideo]?.links.map((link: any, index: number) => (
            <div className="mb-5" key={index}>
              <h2 className="800px:text-[20px] 800px:inline-block text-black dark:text-white">
                {link?.title && link?.title + ":"}
              </h2>
              <a className="text-[#4395c4] inline-block 800px:text-[20px] 800px:pl-2">
                {link?.url}
              </a>
            </div>
          ))}
        </div>
      )}
      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              width={50}
              height={50}
              alt=""
              className="rounded-full w-[50px] h-[50px] object-cover"
              src={
                user.avatar
                  ? user.avatar.url
                  : "../../../public/userProfile.png"
              }
            />
            <textarea
              name=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              cols={40}
              rows={5}
              id=""
              placeholder="write your question ..."
              className="outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
            />
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 `}
            >
              Submit
            </div>
          </div>
        </>
      )}
      {activeBar === 3 && (
        <div className="w-full">
          <>
            {!isReviewsExits && (
              <>
                <div className="flex w-full">
                  <Image
                    width={50}
                    height={50}
                    alt=""
                    className="rounded-full w-[50px] h-[50px] object-cover"
                    src={
                      user.avatar
                        ? user.avatar.url
                        : "../../../public/userProfile.png"
                    }
                  />
                  <div className="w-full">
                    <h5 className="pl-3 text-[20px] font-500">
                      Give a rating <span className="text-red-500">*</span>
                    </h5>
                    <div className="w-full ml-2 pb-3 flex">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            className="mr-1 cursor-pointer "
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            className="mr-1 cursor-pointer "
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <textarea
                      name=""
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      cols={40}
                      rows={5}
                      id=""
                      placeholder="write your review ..."
                      className="outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
                    />
                    <div className="w-full flex justify-end">
                      <div
                        className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 `}
                      >
                        Submit
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        </div>
      )}
    </div>
  );
};

export default CourseContentMedia;
