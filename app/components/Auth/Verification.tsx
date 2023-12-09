"use client";
import { FC, useEffect, useRef, useState } from "react";
import { MdVerifiedUser } from "react-icons/md";
import { styles } from "../styles/style";
import { useActivationMutation } from "@/redux/features/Auth/authApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import LoadingDefaultBtn from "../Buttons/LoadingDefaultBtn";

type Props = {
  setRoute: (route: string) => void;
};
type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};
const Verification: FC<Props> = ({ setRoute }) => {
  const { token } = useSelector((state: any) => state.auth);
  const [invalidError, setInvalidError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [activation, { error, data, isError, isSuccess }] =
    useActivationMutation();
  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });
  const inputRefs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
  ];

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account activated successfully");
      setRoute("Login");
    }
    if (error) {
      if ("data" in error) {
        setInvalidError(true);
        const errorData = error as any;
        toast.error(errorData.data.message);
      } else {
        console.log("An error occured", error);
      }
    }
  }, [isSuccess, error]);
  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }
    setLoading(true);
    await activation({
      activationToken: token,
      activationCode: verificationNumber,
    });
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);

    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);
    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };
  return (
    <div>
      <h1 className={`${styles.title}`}> Verify your account</h1>
      <br />
      <div className="w-full flex items-center justify-center mt-2">
        <div className="w-[80px] h-[80px] rounded-full bg-[#497Df2] flex items-center justify-center ">
          <MdVerifiedUser size={40} />
        </div>
      </div>
      <br />
      <br />
      <div className="m-auto flex items-center justify-around">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="number"
            key={key}
            ref={inputRefs[index]}
            placeholder=""
            maxLength={1}
            value={verifyNumber[key as keyof VerifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
            className={` ${
              invalidError
                ? "shake border-red-500"
                : "dark:border-white border-[#000000]"
            } w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-center text-black dark:text-white`}
          />
        ))}
      </div>
      <br />
      <br />
      <LoadingDefaultBtn
        loading={loading}
        handleClick={verificationHandler}
        text="Verify"
      />

      <br />
      <h5 className="text-[14px] text-center font-Poppins pt-4 text-slate-600 dark:text-white ">
        Go back to sign in ?
        <span
          onClick={() => setRoute("Login")}
          className="text-[#2190ff] cursor-pointer pl-1"
        >
          Sign in
        </span>
      </h5>
    </div>
  );
};

export default Verification;
