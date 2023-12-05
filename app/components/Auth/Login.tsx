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
import { useLoginMutation } from "@/redux/features/Auth/authApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { signIn } from "next-auth/react";

const schema = Yup.object().shape({
  email: Yup.string().email("ivalid email").required("Please enter your email"),
  password: Yup.string().required("Please enter your password").min(6),
});
type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
  refetch: any;
};

const Login: FC<Props> = ({ setRoute, setOpen, refetch }) => {
  const { user } = useSelector((state: any) => state.auth);
  const [show, setShow] = useState(false);
  const [login, { isSuccess, error }] = useLoginMutation();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successfully");
      setOpen(false);
      refetch && refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error("invalid email or password");
      } else {
        console.log("error", error);
      }
    }
  }, [isSuccess, error]);
  const { errors, touched, handleChange, handleSubmit, values } = formik;
  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Login with Elearning</h1>
      <form onSubmit={handleSubmit}>
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
            type={show ? "text" : "password"}
            name=""
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="password@#!"
            className={`${
              errors.password && touched.password ? "border-red-500" : ""
            } ${styles.input}`}
          />

          {show === false ? (
            <AiOutlineEyeInvisible
              onClick={() => setShow(true)}
              size={20}
              className={`text-black absolute bottom-5  r-2 ml-[380px] z-1 cursor-pointer`}
            />
          ) : (
            <AiOutlineEye
              size={20}
              onClick={() => setShow(false)}
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
          <input type="submit" value="Login" className={`${styles.button}`} />
        </div>
        <br />
        <h5 className="text-[14px] text-center font-Poppins pt-4 text-slate-600 dark:text-white ">
          Or join with{" "}
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle
            size={30}
            className={`cursor-pointer mr-2`}
            onClick={() => signIn("google")}
          />
          <AiOutlineGithub
            size={30}
            className={`cursor-pointer mr-2 text-black dark:text-white`}
            onClick={() => signIn("github")}
          />
        </div>
        <h5 className="text-[14px] text-center font-Poppins pt-4 text-slate-600 dark:text-white ">
          Not have an account ?
          <span
            onClick={() => setRoute("Sign-Up")}
            className="text-[#2190ff] cursor-pointer pl-1"
          >
            Sign up
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default Login;
