"use client";

import Image from "next/image";
import Heading from "./utils/Heading";
import { FC, useState } from "react";
import Header from "./components/Header";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  return (
    <div>
      <Heading
        title="ELearning"
        description="Elearning is a platform to learn from online classes anywhere across the world"
        keywords="computer science, web development, machine learning"
      />
      <Header open={open} setOpen={setOpen} activeItem={activeItem} />
    </div>
  );
};

export default Page;
