"use client";
import { FC, useEffect, useState } from "react";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineGithub,
} from "react-icons/ai";

import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import { styles } from "../styles/style";
import { useRegisterMutation } from "@/redux/features/Auth/authApi";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string().email("ivalid email").required("Please enter your email"),
  password: Yup.string().required("Please enter your password").min(6),
});
type Props = {
  setRoute: (route: string) => void;
};

const SignUp: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [register, { error, data, isError, isSuccess }] = useRegisterMutation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
      const message = data?.message as string;
      toast.success(message);
      setRoute("Verification");
    }
    if (error) {
      setLoading(false);
      if ("data" in error) {
        const errorData = error.data as string;
        toast.error(errorData);
      }
    }
  }, [isSuccess, error]);
  console.log("isLoading", loading);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      setLoading(true);
      const data = { name, email, password };
      await register(data);
    },
  });
  const { errors, touched, handleChange, handleSubmit, values } = formik;
  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Sign in to Elearning</h1>
      <form onSubmit={handleSubmit}>
        <label className={`${styles.label} `} htmlFor="email">
          Enter your name
        </label>
        <input
          type="text"
          name=""
          value={values.name}
          onChange={handleChange}
          id="name"
          placeholder="bob"
          className={`${errors.name && touched.name ? "border-red-500" : ""} ${
            styles.input
          }`}
        />
        {errors.name && touched.name ? (
          <span className="text-red-500 pt-2 block">{errors.name}</span>
        ) : (
          <></>
        )}
        <label className={`${styles.label} `} htmlFor="email">
          Enter your email
        </label>
        <input
          type="email"
          name=""
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="login@gmail.com"
          className={`${
            errors.email && touched.email ? "border-red-500" : ""
          } ${styles.input}`}
        />
        {errors.email && touched.email ? (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        ) : (
          <></>
        )}
        <label className={`${styles.label} `} htmlFor="email">
          Enter your password
        </label>
        <div className="relative ">
          <input
            type={show ? "password" : "text"}
            name=""
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="password@#!"
            className={`${
              errors.password && touched.password ? "border-red-500" : ""
            } ${styles.input}`}
          />

          {show ? (
            <AiOutlineEyeInvisible
              onClick={() => setShow(false)}
              size={20}
              className={`text-black absolute bottom-5  r-2 ml-[380px] z-1 cursor-pointer`}
            />
          ) : (
            <AiOutlineEye
              size={20}
              onClick={() => setShow(true)}
              className={`text-black absolute bottom-5 r-2  ml-[380px] z-1 cursor-pointer`}
            />
          )}
          {errors.password && touched.password ? (
            <span className="text-red-500 pt-2 block">{errors.password}</span>
          ) : (
            <></>
          )}
        </div>
        <div className="w-full mt-5">
          {loading ? (
            <button className={`${styles.button}`}>
              {" "}
              <CircularProgress sx={{ width: "10px", height: "10px" }} />
            </button>
          ) : (
            <input
              type="submit"
              value="Sign up"
              className={`${styles.button}`}
            />
          )}
        </div>
        <br />
        <h5 className="text-[14px] text-center font-Poppins pt-4 text-slate-600 dark:text-white ">
          Or join with{" "}
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className={`cursor-pointer mr-2`} />
          <AiOutlineGithub
            size={30}
            className={`cursor-pointer mr-2 text-black dark:text-white`}
          />
        </div>
        <h5 className="text-[14px] text-center font-Poppins pt-4 text-slate-600 dark:text-white ">
          Already have an account ?
          <span
            onClick={() => setRoute("Login")}
            className="text-[#2190ff] cursor-pointer pl-1"
          >
            Sign in
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default SignUp;
