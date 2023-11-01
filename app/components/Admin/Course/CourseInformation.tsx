import React, { FC, useState } from "react";
import { styles } from "../../styles/style";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };
  return (
    <div className="w-[80%] m-auto mt-[24px]">
      <form className={`${styles.label}`} onSubmit={handleSubmit}>
        <label htmlFor="">Course Name</label>
      </form>
    </div>
  );
};

export default CourseInformation;
