import { useEffect, useState } from "react";
import { styles } from "../styles/style";
import { useUpdatePasswordMutation } from "@/redux/features/User/userApi";
import toast from "react-hot-toast";
import "../Loader/loader.css";

const PasswordChange = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword, { isSuccess, error, isLoading }] =
    useUpdatePasswordMutation();

  const passwordChangeHandler = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      await updatePassword({ oldPassword, newPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password changed successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error("something went wrong");
      }
    }
  }, [isSuccess, error]);
  return (
    <>
      {isLoading ? (
        <div className="m-auto flex items-center justify-center  mt-[150px]">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0">
          <h1 className="block text-[25px] 800px:text-[30px] font-500 font-Poppins text-center dark:text-white text-slate-800 pb-2">
            Change password
          </h1>
          <div className="w-full">
            <form
              onSubmit={passwordChangeHandler}
              className="flex flex-col items-center"
            >
              <div className="w-[100%] 800px:w-[60%] mt-5">
                <label className="nlock pb-2">Enter your old password</label>
                <input
                  type="password"
                  className={`${styles.input} w-[95%] mb-4 800px:mb-0 border-slate-800 bg-slate-100 dark:bg-slate-400`}
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="w-[100%] 800px:w-[60%] mt-5">
                <label className="nlock pb-2">Enter your new password</label>
                <input
                  type="password"
                  className={`${styles.input} w-[95%] mb-4 800px:mb-0 border-slate-800 bg-slate-100 dark:bg-slate-400`}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="w-[100%] 800px:w-[60%] mt-5">
                <label className="nlock pb-2">Confirm your new password</label>
                <input
                  type="password"
                  className={`${styles.input} w-[95%] mb-4 800px:mb-0 border-slate-800 bg-slate-200 dark:bg-slate-400`}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="w-[100%] 800px:w-[60%] m-auto  block pb-4">
                <input
                  type="submit"
                  value="Update"
                  required
                  className={`w-full 800px:w-[250px]  h-[40px] border-2 m-auto border-[#37a39a] text-black dark:text-white rounded-[3px] bg-slate-100 dark:bg-slate-400 mt-8 cursor-pointer`}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PasswordChange;
