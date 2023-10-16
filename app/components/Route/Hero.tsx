import { FC } from "react";
import Image from "next/image";

interface Props {}

const Hero: FC<Props> = () => {
  return (
    <Image
      src={
        "https://www.distancelearningcollege.co.uk/wp-content/uploads/2022/02/Online-learning-scaled.jpg"
      }
      alt="img"
      width={200}
      height={200}
    />
  );
};

export default Hero;
