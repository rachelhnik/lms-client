import React, { useState } from "react";
import { styles } from "../styles/style";
import { HiMinus, HiPlus } from "react-icons/hi";

const FAQ = () => {
  const [activeQuesiton, setActiveQuestion] = useState(null);

  const faqs = [
    {
      question:
        "What are the requirements to take the courses or sign up with your website?",
      answer:
        "As long as you have internet and laptops, you can learn from anywhere,anytime.",
      id: 1,
    },
    {
      question: "How long does each course take?",
      answer: "Most courses are around three months duration.",
      id: 2,
    },
    {
      question: "How much do courses cost?",
      answer:
        "It depends on type of course , but we have monthly discount programme.",
      id: 3,
    },
    {
      question: "Can I learn at my own pace?",
      answer: "Yes . You can learn at your own pace.",
      id: 4,
    },
  ];

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
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`${
                  faq.id === faqs[0].id && "border-t"
                } border-gray-200 pt-6`}
              >
                <dt className="text-lg">
                  <button
                    className="flex items-start justify-between w-full text-left focus:outline-none"
                    onClick={() => toggleQuestion(faq.id)}
                  >
                    <span className="font-medium text-black dark:text-white">
                      {faq.question}
                    </span>

                    {activeQuesiton === faq.id ? (
                      <HiMinus className="text-black dark:text-white h-6 w-6" />
                    ) : (
                      <HiPlus className="text-black dark:text-white h-6 w-6" />
                    )}
                  </button>
                </dt>
                {activeQuesiton === faq.id && (
                  <dd className="mt-4 pr-12">
                    <p className="text-base text-black dark:text-white font-Poppins">
                      {faq.answer}
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
