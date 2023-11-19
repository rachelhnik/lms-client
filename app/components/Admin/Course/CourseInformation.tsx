import React, { FC, useState } from "react";
import { styles } from "../../styles/style";
import Image from "next/image";

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

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] m-auto mt-[24px] ml-2 ">
      <form className={`${styles.label}`} onSubmit={handleSubmit}>
        <label htmlFor="">Course Name</label>
        <input
          type="name"
          name=""
          required
          placeholder="MERN stack LMS platform with nextjs 13"
          value={courseInfo.name}
          onChange={(e) =>
            setCourseInfo({ ...courseInfo, name: e.target.value })
          }
          id="name"
          className={`${styles.input}`}
        />
        <br />
        <label htmlFor="">Course Description</label>
        <textarea
          name=""
          cols={30}
          rows={8}
          required
          placeholder="Write something amazing"
          value={courseInfo.description}
          onChange={(e) =>
            setCourseInfo({ ...courseInfo, description: e.target.value })
          }
          id=""
          className={`${styles.input} !h-min !py-2`}
        ></textarea>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label htmlFor="">Course price</label>
            <input
              type="number"
              name=""
              required
              placeholder="29"
              value={courseInfo.price}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              id="price"
              className={`${styles.input} `}
            />
          </div>
          <div className="w-[50%]">
            <label htmlFor="">Estimated price (optional)</label>
            <input
              type="number"
              name=""
              required
              placeholder="79"
              value={courseInfo.estimatedPrice}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              id="price"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div>
          <label htmlFor="">Course Tags</label>
          <input
            type="name"
            name=""
            required
            placeholder="Fullstack, Nextjs, Nodejs"
            value={courseInfo.tags}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
            id="name"
            className={`${styles.input}`}
          />
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label htmlFor="">Course level</label>
            <input
              type="text"
              name=""
              required
              placeholder="beginner/intermediate/advance"
              value={courseInfo.level}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              id="price"
              className={`${styles.input} `}
            />
          </div>
          <div className="w-[50%]">
            <label htmlFor="">Demo Url</label>
            <input
              type="text"
              name=""
              required
              placeholder="eer79fd"
              value={courseInfo.demoUrl}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              id="price"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-black p-3 border flex justify-center items-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <Image
                src={courseInfo.thumbnail.url || courseInfo.thumbnail}
                alt=""
                width={200}
                height={200}
                className="w-full h-auto"
              />
            ) : (
              <span className="text-black dark:text-white">
                {" "}
                Drag and drop your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full 800px:[w-180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
