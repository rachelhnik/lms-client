import React, { useEffect, useState } from "react";
import CoursePlayer from "../Admin/Course/CoursePlayer";
import { styles } from "../styles/style";
import { VscVerifiedFilled } from "react-icons/vsc";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import Image from "next/image";
import {
  useAddAnswerToQuestionMutation,
  useAddNewQuestionMutation,
  useAddReplyInReviewMutation,
  useAddReviewToCourseMutation,
  useGetCourseDetailsQuery,
} from "@/redux/features/Courses/CoursesApi";
import toast from "react-hot-toast";
import { format } from "timeago.js";
import { BiMessage } from "react-icons/bi";
import Ratings from "../Admin/Course/Ratings";
import userProfile from "../../../public/userProfile.png";
import socketIo from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIo(ENDPOINT, { transports: ["websocket"] });

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (data: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}: Props) => {
  const [addNewQuestion, { isSuccess, error, isLoading: addQuestionLoading }] =
    useAddNewQuestionMutation();

  const { data: courseData, refetch: refetchCourse } = useGetCourseDetailsQuery(
    id,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [
    addReplyInReview,
    {
      isSuccess: reviewReplySuccess,
      error: reviewReplyError,
      isLoading: reviewReplyLoading,
    },
  ] = useAddReplyInReviewMutation();
  const course = courseData?.course;

  const [
    addReviewToCourse,
    {
      isSuccess: reviewAddSuccess,
      error: reviewAddError,
      isLoading: reviewAddLoading,
    },
  ] = useAddReviewToCourseMutation();

  const [
    addAnswerToQuestion,
    {
      isSuccess: addAnswerSuccess,
      error: addAnswerError,
      isLoading: addAnswerLoading,
      data: anser,
    },
  ] = useAddAnswerToQuestionMutation();

  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [reply, setReply] = useState("");

  const isReviewsExits = course?.reviews?.find(
    (review) => review.user._id === user._id
  );

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question cannot be empty");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  const handleReviewSubmit = () => {
    if (review.length === 0) {
      toast.error("Review can't be empty");
    } else {
      addReviewToCourse({ review, rating, courseId: id });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      socketId.emit("notification", {
        title: "New question received",
        message: `You have a new order from ${data[activeVideo]?.title}`,
        userId: user._id,
      });
    }
    if (addAnswerSuccess) {
      setAnswer("");
      refetch();
      toast.success("successfully updated");
      if (user.role !== "admin") {
        socketId.emit("notification", {
          title: "New answer received",
          message: `You have a new order from ${data[activeVideo]?.title}`,
          userId: user._id,
        });
      }
    }
    if (reviewAddSuccess) {
      setReview("");
      setRating(1);
      refetchCourse();
      toast.success("Review added successfully");
      socketId.emit("notification", {
        title: "New review received",
        message: `You have a new order from ${data[activeVideo]?.title}`,
        userId: user._id,
      });
    }
    if (reviewReplySuccess) {
      setReply("");
      setIsReviewReply(false);
      refetchCourse();
      toast.success("Reply added successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error("something went wrong");
      }
    }
    if (addAnswerError) {
      if ("data" in addAnswerError) {
        const errorData = addAnswerError as any;
        toast.error("something went wrong");
      }
    }
    if (reviewAddError) {
      if ("data" in reviewAddError) {
        const errorData = error as any;
        toast.error("something went wrong");
      }
    }
    if (reviewReplyError) {
      if ("data" in reviewReplyError) {
        const errorData = error as any;
        toast.error("something went wrong");
      }
    }
  }, [
    isSuccess,
    error,
    addAnswerSuccess,
    addAnswerError,
    reviewAddError,
    reviewAddSuccess,
    reviewReplyError,
    reviewReplySuccess,
  ]);

  const handleAnswerSubmit = () => {
    addAnswerToQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
    });
  };

  const handleReviewReplySubmit = () => {
    if (reply === "") {
      toast.error("Reply can't be empty");
    } else {
      addReplyInReview({ comment: reply, reviewId, courseId: id });
    }
  };

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
                Source code : {link?.title && link?.title}
              </h2>
              <a className="text-black dark:text-white inline-block 800px:text-[20px] 800px:pl-2">
                Source url : {link?.url}
              </a>
            </div>
          ))}
        </div>
      )}
      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              width={40}
              height={40}
              alt=""
              className="rounded-full w-[40px] h-[40px] object-cover"
              src={user.avatar ? user.avatar.url : userProfile}
            />
            <textarea
              name=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              cols={40}
              rows={5}
              id=""
              placeholder="write your question ..."
              className="outline-none bg-transparent ml-3 border dark:border-[#ffffff57] border-[#15101053 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
            />
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`${
                styles.button
              } !w-[120px] !h-[40px] text-[18px] mt-5 ${
                addQuestionLoading && "cursor-not-allowed"
              } `}
              onClick={addQuestionLoading ? () => {} : handleQuestion}
            >
              Submit
            </div>
          </div>
          <br />
          <br />
          <div className="w-full h-[1px] dark:bg-[#ffffff3b] bg-[#15101053]"></div>
          <div>
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setQuestionId={setQuestionId}
              addAnswerLoading={addAnswerLoading}
            />
          </div>
        </>
      )}
      {activeBar === 3 && (
        <div className="w-full">
          <>
            <>
              <div className="flex w-full">
                <Image
                  width={40}
                  height={40}
                  alt=""
                  className="rounded-full w-[40px] h-[40px] object-cover"
                  src={user.avatar ? user.avatar.url : userProfile}
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
                    className="outline-none bg-transparent ml-3 border dark:border-[#ffffff57] border-[#15101053] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
                  />
                  <div className="w-full flex justify-end">
                    <div
                      className={`${
                        styles.button
                      } !w-[120px] !h-[40px] text-[18px] mt-5  ${
                        reviewAddLoading && "cursor-not-allowed"
                      }`}
                      onClick={reviewAddLoading ? () => {} : handleReviewSubmit}
                    >
                      Submit
                    </div>
                  </div>
                </div>
              </div>
            </>

            <br />
            <div className="w-full h-[1px] dark:bg-[#ffffff3b] bg-[#15101053]"></div>
            <div className="w-full">
              {course.reviews &&
                [...course.reviews]
                  .reverse()
                  .map((review: any, index: number) => (
                    <div key={index} className="w-full my-5">
                      <div className="w-full flex">
                        <div>
                          <Image
                            width={40}
                            height={40}
                            alt=""
                            className="rounded-full w-[40px] h-[40px] object-cover"
                            src={
                              review.user.avatar
                                ? review.user.avatar.url
                                : userProfile
                            }
                          />
                        </div>
                        <div className="pl-3">
                          <h5 className="text-[20px">{review.user.name}</h5>
                          <Ratings rating={review.rating} />
                          <p>{review.comment}</p>
                          <small className="text-[#ffffff83]">
                            {review.createdAt ? format(review.createdAt) : ""}
                          </small>
                        </div>
                      </div>
                      {review.commentReplies.map(
                        (commentReply: any, index: number) => (
                          <div
                            className="w-full flex 800px:ml-16 text-black dark:text-white"
                            key={commentReply._id}
                          >
                            <div>
                              <Image
                                width={40}
                                height={40}
                                alt=""
                                className="rounded-full w-[40px] h-[40px] object-cover"
                                src={
                                  commentReply.user.avatar
                                    ? commentReply.user.avatar.url
                                    : userProfile
                                }
                              />
                            </div>
                            <div className="pl-2">
                              <div className="flex items-center">
                                <h5 className="text-[20px]">
                                  {commentReply.user.name}
                                </h5>
                                {commentReply.user.role === "admin" && (
                                  <VscVerifiedFilled className="text-[20px] text-[#0095F6] ml-2" />
                                )}
                              </div>
                              <p>{commentReply.comment}</p>
                              <small className="text-[#ffffff83]">
                                {commentReply.createdAt
                                  ? format(commentReply.createdAt)
                                  : ""}
                              </small>
                            </div>
                          </div>
                        )
                      )}
                      {user.role === "admin" && (
                        <span
                          className={styles.label}
                          onClick={() => {
                            setIsReviewReply(true);
                            setReviewId(review._id);
                          }}
                        >
                          Add reply
                        </span>
                      )}
                      <div>
                        {isReviewReply && reviewId === review._id && (
                          <div className="w-full flex relative">
                            <input
                              type="text"
                              value={reply}
                              onChange={(e) => setReply(e.target.value)}
                              placeholder="Enter your reply ..."
                              className={`block 800px:ml-12 mt-2 outline-none bg-transparent w-full border-b border-[#00000027] dark:text-white text-black dark:border-[#fff] p-[5px] `}
                            />
                            <button
                              type="submit"
                              className={`absolute right-0 bottom-1 ${
                                reviewReplyLoading && "cursor-not-allowed"
                              }`}
                              onClick={
                                reviewReplyLoading
                                  ? () => {}
                                  : handleReviewReplySubmit
                              }
                            >
                              Submit
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
            </div>
          </>
        </div>
      )}
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  setQuestionId,
  addAnswerLoading,
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo]?.questions.map((question: any, index: number) => (
          <CommentItem
            key={question._id}
            data={data}
            activeVideo={activeVideo}
            question={question}
            index={index}
            handleAnswerSubmit={handleAnswerSubmit}
            setQuestionId={setQuestionId}
            answer={answer}
            setAnswer={setAnswer}
            addAnswerLoading={addAnswerLoading}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  data,
  activeVideo,
  question,
  index,
  handleAnswerSubmit,
  answer,
  setQuestionId,
  setAnswer,
  addAnswerLoading,
}) => {
  const [replyActive, setReplyActive] = useState(false);
  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <div>
            <Image
              width={40}
              height={40}
              alt=""
              className="rounded-full w-[40px] h-[40px] object-cover"
              src={
                question.user.avatar ? question.user.avatar.url : userProfile
              }
            />
          </div>

          <div className="pl-3">
            <h5 className="text-[20px] ">{question.user.name}</h5>
            <p>{question.question}</p>
            <small className="dark:text-[#ffffff83] text-black">
              {question.createdAt ? format(question.createdAt) : ""}
            </small>
          </div>
        </div>
        <div className="w-full flex items-center">
          <span
            className="800px:pl-16 dark:text-[#ffffff83] text-black cursor-pointer mr-2"
            onClick={() => {
              setReplyActive(!replyActive);
              setQuestionId(question._id);
            }}
          >
            {!replyActive
              ? question.questionReplies.length === 0
                ? "Add reply"
                : "All replies"
              : "Hide replies"}
          </span>
          <BiMessage size={20} className="cursor-pointer text-[#fffff83]" />
          <span className="pl-1 mt-[-4px] cursor-pointer text-[#fffff83]">
            {question.questionReplies.length}
          </span>
        </div>
        {replyActive && (
          <>
            {question.questionReplies.map((reply: any) => (
              <div
                className="w-full flex 800px:ml-16 text-black dark:text-white"
                key={reply._id}
              >
                <div>
                  <Image
                    width={40}
                    height={40}
                    alt=""
                    className="rounded-full w-[40px] h-[40px] object-cover"
                    src={
                      reply.user.avatar ? reply.user.avatar.url : userProfile
                    }
                  />
                </div>
                <div className="pl-2">
                  <div className="flex items-center">
                    <h5 className="text-[20px]">{reply.user.name}</h5>
                    {reply.user.role === "admin" && (
                      <VscVerifiedFilled className="text-[20px] text-[#0095F6] ml-2" />
                    )}
                  </div>
                  <p>{reply.answer}</p>
                  <small className="text-[#ffffff83]">
                    {reply.createdAt ? format(reply.createdAt) : ""}
                  </small>
                </div>
              </div>
            ))}
            <>
              <div className="w-full flex relative text-black dark:text-white">
                <input
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  id=""
                  placeholder="write your answer ..."
                  className={`block 800px:ml-12 mt-2 outline-none bg-transparent w-full border-b border-[#00000027] dark:text-white text-black dark:border-[#fff] p-[5px] ${
                    answer === "" || addAnswerLoading
                      ? "cursor-not-allowed"
                      : ""
                  } `}
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-1"
                  onClick={handleAnswerSubmit}
                  disabled={answer === "" || addAnswerLoading}
                >
                  Submit
                </button>
              </div>
              <br />
            </>
          </>
        )}
      </div>
    </>
  );
};

export default CourseContentMedia;
