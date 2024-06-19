import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import UploadImage from "../components/UploadImage";
import * as yup from "yup";
import useHelmet from "../hooks/useHelmet";
import UserRequester from "../service/userRequester";
import { useDispatch } from "react-redux";
import { MESSAGE_STATUS, setAlertMessage } from "../store/app/alertSlice";
import { setIsAuth } from "../store/app/authSlice";

const Singup = () => {
  const dispatch = useDispatch();
  const naviage = useNavigate();

  useHelmet("App - Singup");
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      full_name: "",
      date_of_birth: "",
      avatar: "",
      role: "user",
    },
    validationSchema: yup.object({
      username: yup.string().required("user name is require!"),
      password: yup.string().required("password is require!"),
      email: yup
        .string()
        .email("Invalid email address")
        .required("email is require!"),
      full_name: yup.string().required("full name is require!"),
      date_of_birth: yup.string().required("date of birth is require!"),
      avatar: yup.string().required("avatar is require!"),
    }),
    onSubmit: async (value) => {
      try {
        const res = await UserRequester.singup(value);

        if (res.status === 201) {
          dispatch(
            setAlertMessage({
              message: "register successfully.",
              status: MESSAGE_STATUS.succes,
            })
          );
          dispatch(setIsAuth(res.data));
          naviage("/");
        }
      } catch (err) {
        dispatch(
          setAlertMessage({
            message: err.response.data,
            status: MESSAGE_STATUS.error,
          })
        );
        console.log(err);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950 ">
      <div className="bg-white dark:bg-gray-900 border border-solid border-gray-200 shadow-md rounded-lg px-8 py-6 w-2/6">
        <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
          Register
        </h1>
        <form onSubmit={formik.handleSubmit} action="#">
          {/* username */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              User Name
            </label>
            <input
              name="username"
              onChange={formik.handleChange}
              type="text"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="input user name"
            />
            {formik.errors.username && formik.touched.username && (
              <span className="text-[12px] text-rose-600">
                {formik.errors.username}
              </span>
            )}
          </div>
          {/* password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              name="password"
              onChange={formik.handleChange}
              type="password"
              id="password"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
            />
            {formik.errors.password && formik.touched.password && (
              <span className="text-[12px] text-rose-600">
                {formik.errors.password}
              </span>
            )}
          </div>
          {/* email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              name="email"
              onChange={formik.handleChange}
              type="email"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="your@email.com"
            />
            {formik.errors.email && formik.touched.email && (
              <span className="text-[12px] text-rose-600">
                {formik.errors.email}
              </span>
            )}
          </div>

          {/* full name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <input
              name="full_name"
              onChange={formik.handleChange}
              type="text"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="input full name"
            />
            {formik.errors.full_name && formik.touched.full_name && (
              <span className="text-[12px] text-rose-600">
                {formik.errors.full_name}
              </span>
            )}
          </div>

          {/* date of birth */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date Of Birth
            </label>
            <input
              name="date_of_birth"
              onChange={formik.handleChange}
              type="text"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="input date of birth"
            />
            {formik.errors.date_of_birth && formik.touched.date_of_birth && (
              <span className="text-[12px] text-rose-600">
                {formik.errors.date_of_birth}
              </span>
            )}
          </div>
          {/* avatar */}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Avatar
            </label>
            <UploadImage
              handleChange={(imageURL) => {
                formik.setFieldValue("avatar", imageURL);
              }}
            />
            {formik.errors.avatar && formik.touched.avatar && (
              <span className="text-[12px] text-rose-600">
                {formik.errors.avatar}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mb-4">
            <Link
              to={"/singin"}
              className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Singin
            </Link>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Singup;
