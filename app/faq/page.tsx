"use client";
import React, { useState } from "react";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import FAQ from "../components/FAQ/FAQ";
import Footer from "../components/Footer/Footer";

const Page = () => {
  const [activeVideo, setActiveVideo] = useState(4);
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Header
        activeItem={4}
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
      <FAQ />
      <Footer />
    </div>
  );
};

export default Page;
