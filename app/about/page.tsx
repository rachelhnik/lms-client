"use client";
import React, { useState } from "react";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import About from "./About";

const Page = () => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Header
        activeItem={2}
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
      <About />
    </div>
  );
};

export default Page;
