import React from "react";
import Image from "next/image";
import { styles } from "../styles/style";
import ReviewCard from "../Review/ReviewCard";

const Reviews = () => {
  const reviews = [
    {
      name: "Mike",
      avatar:
        "https://wisehealthynwealthy.com/wp-content/uploads/2022/01/CreativecaptionsforFacebookprofilepictures.jpg",
      profession: "Fullstack dev",
      comment:
        "Duis posuere bibendum mauris a dapibus. Praesent sed ex a orci vestibulum fringilla. Vivamus tempus justo nunc, vel laoreet sapien tempor ve",
      ratings: 5,
    },
    {
      name: "Jordan",
      avatar:
        "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp",
      profession: "Android dev",
      comment:
        "Duis posuere bibendum mauris a dapibus. Praesent sed ex a orci vestibulum fringilla. Vivamus tempus justo nunc, vel laoreet sapien tempor ve",
      ratings: 5,
    },
    {
      name: "Suzan",
      avatar:
        "https://buffer.com/library/content/images/size/w1600/2022/03/sigmund-MQ2xYBHImKM-unsplash--1--1.jpg",
      profession: "Fullstack dev",
      comment:
        "Duis posuere bibendum mauris a dapibus. Praesent sed ex a orci vestibulum fringilla. Vivamus tempus justo nunc, vel laoreet sapien tempor ve",
      ratings: 5,
    },
    {
      name: "Ellen",
      avatar: "https://buffer.com/library/content/images/2022/03/amina.png",
      profession: "Data analyst",
      comment:
        "Duis posuere bibendum mauris a dapibus. Praesent sed ex a orci vestibulum fringilla. Vivamus tempus justo nunc, vel laoreet sapien tempor ve",
      ratings: 5,
    },
    {
      name: "Maria",
      avatar:
        "https://buffer.com/library/content/images/2022/03/skitch--7-.png",
      profession: "UIUX designer",
      comment:
        "Duis posuere bibendum mauris a dapibus. Praesent sed ex a orci vestibulum fringilla. Vivamus tempus justo nunc, vel laoreet sapien tempor ve",
      ratings: 5,
    },
  ];
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center">
        <div className="800px:w-[50%] w-full">
          <Image
            src={
              "https://www.ed2go.com/common/images/1/16412/team-building-class/jpg.jpg"
            }
            alt="business"
            width={700}
            height={700}
          />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our students are <span className="text-gradient">our strength</span>
            <br /> See what they say about us
          </h3>
          <br />
          <p className={`${styles.title}`}>
            Duis posuere bibendum mauris a dapibus. Praesent sed ex a orci
            vestibulum fringilla. Vivamus tempus justo nunc, vel laoreet sapien
            tempor vel. Interdum et malesuada fames ac ante ipsum primis in
            faucibus.
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className="grid  grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] mt-4 lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[0px] md:[&>*:nth-child(6)]:!mt-[-40px]">
        {reviews &&
          reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
      </div>
    </div>
  );
};

export default Reviews;
