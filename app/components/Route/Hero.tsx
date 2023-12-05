"use client";
import { FC, useState } from "react";
import Image from "next/image";
import { AiOutlineSearch } from "react-icons/ai";
import { useGetHeroDataQuery } from "@/redux/features/layout/LayoutApi";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";

interface Props {}

const Hero: FC<Props> = () => {
  const { data, isLoading } = useGetHeroDataQuery("Banner", {});
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search === "") {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className=" dark:bg-slate-800 w-full h-auto 1000px:flex items-center">
          <div
            className={`w-full   max-400px:flex-col flex justify-center items-center`}
          >
            <div className="1000px:w-[40%] 1000px:h-[80%] min-w-[50%]  flex items-start justify-end z-10 m-auto 800px:mt-[180px] rounded ">
              <Image
                src={data?.layout?.banner?.image.url}
                alt="img"
                width={500}
                height={200}
                className="object-contain max-w-[80%] m-auto h-auto z-[90] mt-10 shadow-2xl rounded-md  "
              />
            </div>
            <div className=" max-400px:w-[90%] w-[50%] text-slate-600 min-800px:h-screen  dark:text-slate-400 max-400px:mt-[0px] flex flex-col justify-center items-start m-auto 800px:mt-[220px] mx-3 ">
              <h1 className="text-[40px] 400px:w-[90%] 800px:w-[70%]">
                {data?.layout?.banner?.title}
              </h1>
              <br></br>
              <p>{data?.layout?.banner?.subtitle}</p>

              <form className="mt-4 flex 400px:min-w-[300px]">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search classes"
                  className="w-[300px] h-14 rounded-s-md p-2 dark:bg-slate-300 border-blue-300 border-2   text-slate-600 dark:text-slate-600 "
                />
                <button
                  className="h-14 w-10   border-blue dark:bg-slate-300 light:border-2 bg-blue-300 text-slate-600 dark:text-slate-600 rounded-e-md focus:ring-2 focus:ring-inset focus:ring-darkBlue "
                  onClick={handleSearch}
                >
                  <AiOutlineSearch className="text-[30px] text-center mt-2 ml-1" />
                </button>
              </form>
              <div className="max-400px:flex-col flex mt-2">
                <p>500K+ people already trusted us.</p>
                <p className="text-green-600">View courses</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
