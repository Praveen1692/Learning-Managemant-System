import React, { useState } from "react";
import { toast } from "react-hot-toast";
import HomeLayout from "../Layouts/HomeLayout";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Redux/Slices/AuthSlice.js";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const hanldeUserInput = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      //alert("Please fill all the fields");
      toast.error("Please fill all the fields");
      return;
    }

    // dispatch create account event or actions
    const response = await dispatch(login(loginData));
    console.log(response);
    console.log("Change");
    console.log(response.payload);
    console.log(response?.payload?.data);
    navigate("/");
    if (response?.payload?.data) {
      console.log("nav");

      navigate("/"); // form submit hone k baad home page pr return nhi ho rha h
    }

    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center  h-[100vh] ">
        <form
          noValidate
          onSubmit={onLogin}
          action=""
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-80 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold ">Login Page</h1>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold">
              Email:{" "}
            </label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter Your E-mail.."
              className="bg-transparent px-2 py-1 border"
              onChange={hanldeUserInput}
              value={loginData.email}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold">
              Password:{" "}
            </label>
            <input
              type="password"
              required
              name="password"
              id="password"
              placeholder="Enter Your Password.."
              className="bg-transparent px-2 py-1 border"
              onChange={hanldeUserInput}
              value={loginData.password}
            />
          </div>


          <button
            type="submit"
            className="mt-2 w-full bg-[#3503fc] hover:bg-[#fc8c03] transition-all ease-in-out duration-300 rounded-sm px-2 py-2 font-semibold text-lg cursor-pointer"
          >
            Login account
          </button>

          <Link to={"/forgetpassword"}>
            <p className="text-center link text-accent cursor-pointer">
              Forget Password
            </p>
          </Link>


          <p className="text-center">
            Donot have a account ?{" "}
            <Link to="/signup" className="link text-accent cursor-pointer ">
              Sign Up
            </Link>{" "}
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Login;
