"use client";
import { useState } from "react";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import Protected from "../hooks/userProtected";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";

interface Props {}

const Page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div>
      <Protected>
        <Heading
          title={`${user.name}-profile`}
          description="Elearning is a platform to learn from online classes anywhere across the world"
          keywords="computer science, web development, machine learning"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          route={route}
          setRoute={setRoute}
        />
        <Profile user={user} />
      </Protected>
    </div>
  );
};

export default Page;
