import React, { FC } from "react";
import { styles } from "../../styles/style";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import toast from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequsities: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};
const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequsities,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index: number, value: string) => {
    const updatedBenefits = [...benefits];

    updatedBenefits[index] = { ...updatedBenefits[index], title: value };
    setBenefits(updatedBenefits);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerequsiteChange = (index: number, value: string) => {
    const updatedPrerequsites = [...prerequisites];
    updatedPrerequsites[index] = {
      ...updatedPrerequsites[index],
      title: value,
    };
    setPrerequsities(updatedPrerequsites);
  };
  const handleAddPrerequsite = () => {
    setPrerequsities([...prerequisites, { title: "" }]);
  };

  const prevBtn = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      benefits[benefits.length - 1].title !== "" &&
      prerequisites[prerequisites.length - 1].title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill all field to go next");
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label className={`${styles.label}`} htmlFor="email">
          What are the benefits for students in this course?
        </label>
        <br />
        {benefits?.map((benefit: any, index: number) => (
          <input
            type="text"
            key={index}
            name="Benefit"
            placeholder="You will be able to build a full stack LMS paltform ..."
            className={`${styles.input} my-2`}
            value={benefit.title}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
          style={{ cursor: "pointer", margin: "10px 0px", width: "30px" }}
          onClick={handleAddBenefit}
        />
        <label className={`${styles.label}`} htmlFor="email">
          What are the prerequsities for starting this course?
        </label>
        <br />
        {prerequisites?.map((prerequsite: any, index: number) => (
          <input
            type="text"
            key={index}
            name="prerequsite"
            placeholder="You need to have basic knowledge of javascript ..."
            className={`${styles.input} my-2`}
            value={prerequsite.title}
            onChange={(e) => handlePrerequsiteChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
          style={{ cursor: "pointer", margin: "10px 0px", width: "30px" }}
          onClick={handleAddPrerequsite}
        />
        <div className="w-full flex items-center justify-between">
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
    </div>
  );
};

export default CourseData;
