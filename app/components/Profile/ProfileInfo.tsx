"use client";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import userProfile from "../../../public/userProfile.png";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "../styles/style";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import {
  useUpdateAvatarMutation,
  useUpdateUserDataMutation,
} from "@/redux/features/User/userApi";
import toast from "react-hot-toast";

type Props = {
  user: any;
  avatar: string | null;
};

const ProfileInfo: FC<Props> = ({ user, avatar }) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [updateUserData, { isSuccess: success, error: Error }] =
    useUpdateUserDataMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar({ avatar: avatar });
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || success) {
      toast.success("updated successfully");
      setLoadUser(true);
    }
    if (error || Error) {
      toast.error("something went wrong");
      console.log(error);
    }
  }, [isSuccess, error, success, Error]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      await updateUserData({ email: user.email, name: name });
    }
  };
  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            src={
              user.avatar || avatar ? user.avatar.url || avatar : userProfile
            }
            alt=""
            width={80}
            height={80}
            className={`w-[80px] h-[80px] cursor-pointer border-[3px] border-[#37a39a] rounded-full`}
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera
                size={20}
                className="z-1 bg-transparent text-white "
              />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="w-[100%]">
              <label className="block pb-2">Full name</label>
              <input
                type="text"
                className={`${styles.input} w-[95%] mb-4 800px:mb-0 border-slate-800 bg-slate-100 dark:bg-slate-400`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="w-[100%]">
              <label className="block pb-2">Email address</label>
              <input
                type="text"
                className={`${styles.input} w-[95%] mb-4 800px:mb-0 border-slate-800 bg-slate-100 dark:bg-slate-400`}
                required
                value={user.email}
              />
            </div>
          </div>
          <div className="800px:w-[50%] m-auto  block pb-4">
            <input
              type="submit"
              value="Update"
              required
              className={`w-full 800px:w-[250px] h-[40px] border-2 ml-300 border-[#37a39a] text-black bg-slate-100 dark:bg-slate-400 dark:text-white rounded-[3px] mt-8 cursor-pointer`}
            />
          </div>
        </form>
        <br />
      </div>
    </>
  );
};

export default ProfileInfo;
