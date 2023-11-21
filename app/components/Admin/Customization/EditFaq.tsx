"use client";
import {
  useEditLayoutDataMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/LayoutApi";
import React, { useEffect, useState } from "react";
import { styles } from "../../styles/style";
import { HiMinus, HiPlus } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircle, IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";

type Props = {};
const EditFaq = (props: Props) => {
  const { data, isLoading } = useGetHeroDataQuery("FAQ", {
    refetchOnReconnect: true,
  });
  const [editLayoutData, { isSuccess, error, isLoading: editLoading }] =
    useEditLayoutDataMutation();
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }
    if (isSuccess) {
      toast.success("FAQ updated successfully");
    }
    if (error) {
      if ("data" in Error) {
        const errorMsg = Error as any;
        toast.error("Something went wrong");
      }
    }
  }, [data, isSuccess, error]);

  const toggleQuestion = (id: any) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === id ? { ...q, active: !q.active } : q))
    );
  };
  const handleQuestionChange = (id: any, value: any) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, question: value } : q))
    );
  };
  const handleAnswerChange = (id: any, value: any) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
  };
  const newFaqHandler = () => {
    setQuestions([
      ...questions,
      {
        _id: questions.length + 1,
        question: "",
        answer: "",
        active: false,
      },
    ]);
  };

  const areQuestionsUnchanged = (
    originalQuestions: any[],
    newQuestions: any[]
  ) => {
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
  };
  const isAnyQuestionEmpty = (questions: any[]) => {
    return questions.some((q) => q.question === "" || q.answer === "");
  };

  const handleEdit = async () => {
    if (
      !areQuestionsUnchanged(data?.layout?.faq, questions) &&
      !isAnyQuestionEmpty(questions)
    ) {
      await editLayoutData({
        type: "FAQ",
        faq: questions,
      });
    }
  };

  return (
    <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px]">
      <div className="mt-12">
        <dl className="space-y-8">
          {questions.map((q: any) => (
            <div
              key={q._id}
              className={`${
                q._id !== questions[0]._id && "border-t"
              } border-gray-200 pt-6`}
            >
              <dt className="text-lg">
                <button
                  className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                  onClick={() => toggleQuestion(q._id)}
                >
                  <input
                    className={`${styles.input} border-none`}
                    value={q.question}
                    placeholder={`Add your question ...`}
                    onChange={(e: any) =>
                      handleQuestionChange(q._id, e.target.value)
                    }
                  />
                  <span className="ml-6 flex-shrink-0 border-[1px] mt-3">
                    {q.active ? (
                      <HiMinus
                        className="h-6 w-6"
                        onClick={() => {
                          setQuestions((previousQuesitons) =>
                            previousQuesitons.map((question) =>
                              question._id === q._id
                                ? { ...question, active: false }
                                : question
                            )
                          );
                        }}
                      />
                    ) : (
                      <HiPlus
                        className="h-6 w-6"
                        onClick={() => {
                          setQuestions((previousQuesitons) =>
                            previousQuesitons.map((question) =>
                              question._id === q._id
                                ? { ...question, active: true }
                                : question
                            )
                          );
                        }}
                      />
                    )}
                  </span>
                </button>
              </dt>
              {q.active ? (
                <dd className="mt-2 pr-12">
                  <input
                    className={`${styles.input} border-none`}
                    value={q.answer}
                    onChange={(e: any) =>
                      handleAnswerChange(q._id, e.target.value)
                    }
                    placeholder={`Add your answer ...`}
                  />
                  <span className="ml-6 flex-shrink-0">
                    <AiOutlineDelete
                      classname="dark:text-white text-black text-[18px] cursor-pointer"
                      onClick={() => {
                        setQuestions((previousQuestions) =>
                          previousQuestions.filter((item) => item._id !== q._id)
                        );
                      }}
                    />
                  </span>
                </dd>
              ) : (
                <div></div>
              )}
            </div>
          ))}
        </dl>
        <br />
        <br />
        <IoMdAddCircleOutline
          classname="dark:text-white text-black text-[25px] cursor-pointer"
          onClick={newFaqHandler}
        />
      </div>
      <div
        className={` ${
          styles.button
        } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] ${
          areQuestionsUnchanged(data?.layout?.faq, questions) ||
          isAnyQuestionEmpty(questions)
            ? "cursor-not-allowed"
            : "!cursor-pointer !bg-green-500"
        }
        !rounded absolute bottom-12 right-12
        `}
        onClick={handleEdit}
      >
        Save
      </div>
    </div>
  );
};

export default EditFaq;
