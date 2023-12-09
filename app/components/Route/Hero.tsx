"use client";
import { FC, useState } from "react";
import Image from "next/image";
import { AiOutlineSearch } from "react-icons/ai";
import { useGetHeroDataQuery } from "@/redux/features/layout/LayoutApi";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {}

const Hero: FC<Props> = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (search === "") {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  };

  return (
    <>
      <div className=" dark:bg-slate-800  w-full h-auto 800px:mt-10 1000px:flex items-center">
        <div
          className={`w-full max-400px:flex-col flex justify-center items-center`}
        >
          <div className="1000px:w-[50%] 1000px:h-[80%] min-w-[50%]  flex items-start justify-end z-10 m-auto rounded ">
            <Image
              src={
                "https://i.cbc.ca/1.3987067.1487286349!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/coding.jpg"
              }
              alt="img"
              width={700}
              height={200}
              className="object-contain max-w-[85%] m-auto h-auto z-[90] mt-10 shadow-2xl rounded-md  "
            />
          </div>
          <div className=" max-400px:w-[90%] w-[40%  text-slate-600 min-800px:h-screen  dark:text-slate-400 max-400px:mt-[0px] flex flex-col justify-center items-start m-auto  mx-3 ">
            <h1 className=" 800px:text-[40px] text-[30px] 400px:w-[90%]  800px:w-[70%] text-center m-auto font-[600]">
              Nerdemy Elearning
            </h1>
            <p>
              An online learning platform is a webspace or portal for
              educational content and resources that offers a student everything
              they need in one place: lectures, resources, opportunities to meet
              and chat with other students, and more. It is also an excellent
              way for the student and the teacher to monitor student progress.
            </p>

            <form className="mt-4 flex 400px:min-w-[300px] m-auto ">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search classes"
                className="w-[300px] 800px:w-[400px]  h-14 rounded-s-md p-2 dark:bg-slate-300 border-blue-300 border-2   text-slate-600 dark:text-slate-600 "
              />
              <button
                className="h-14 w-10   border-blue dark:bg-slate-300 light:border-2 bg-blue-300 text-slate-600 dark:text-slate-600 rounded-e-md focus:ring-2 focus:ring-inset focus:ring-darkBlue "
                onClick={handleSearch}
              >
                <AiOutlineSearch className="text-[30px] text-center mt-2 ml-1" />
              </button>
            </form>
            <div className=" flex mt-2 m-auto">
              <p>500K+ people already trusted us.</p>
              <Link href={"/courses"}>
                <p className="text-green-600">View courses</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
