"use client";
import React, { useState } from "react";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import Policy from "./Policy";

const Page = () => {
  const [activeVideo, setActiveVideo] = useState(3);
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Header
        activeItem={3}
        open={open}
        setOpen={setOpen}
        route={route}
        setRoute={setRoute}
      />

      <Heading
        title="About us - Nerdemy Elearning"
        description="Nerdemy is a learning platform for programmers"
        keywords="programming,learning,software engineering"
      />
      <Policy />
    </div>
  );
};

export default Page;
