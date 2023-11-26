import { useGetHeroDataQuery } from "@/redux/features/layout/LayoutApi";
import React, { useEffect, useState } from "react";
import { styles } from "../styles/style";
import { HiMinus, HiPlus } from "react-icons/hi";

const FAQ = () => {
  const { data, isLoading } = useGetHeroDataQuery("FAQ", {});
  const [activeQuesiton, setActiveQuestion] = useState(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }
  }, [data]);
  console.log("ques", questions);
  const toggleQuestion = (id: any) => {
    setActiveQuestion(activeQuesiton === id ? null : id);
  };
  return (
    <div>
      <div className="w-[90%] 800px:w-[80%] m-auto">
        <h1 className={`${styles.title} 800px:text-[40px]`}>
          Frequently Asked Quesitons
        </h1>
        <div className="mt-12">
          <dl className="space-y-8">
            {questions.map((question) => (
              <div
                key={question._id}
                className={`${
                  question._id === questions[0].id && "border-t"
                } border-gray-200 pt-6`}
              >
                <dt className="text-lg">
                  <button
                    className="flex items-start justify-between w-full text-left focus:outline-none"
                    onClick={() => toggleQuestion(question._id)}
                  >
                    <span className="font-medium text-black dark:text-white">
                      {question.question}
                    </span>
                    {/* <span className="font-medium text-black dark:text-white">
                      {question.answer}
                    </span> */}
                    {activeQuesiton === question._id ? (
                      <HiMinus className="text-black dark:text-white h-6 w-6" />
                    ) : (
                      <HiPlus className="text-black dark:text-white h-6 w-6" />
                    )}
                  </button>
                </dt>
                {activeQuesiton === question._id && (
                  <dd className="mt-2 pr-12">
                    <p className="text-base text-black dark:text-white font-Poppins">
                      {question.answer}
                    </p>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
