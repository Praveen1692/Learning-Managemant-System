import React, { useState } from "react";
import { toast } from "react-hot-toast";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createAccount } from "../Redux/Slices/AuthSlice";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });
  const hanldeUserInput = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };
  const getImage = (event) => {
    event.preventDefault();
    const uploadedImage = event.target.files[0]; // geeting the image
    if (uploadedImage) {
      setSignupData({
        ...signupData,
        avatar: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        
        setPreviewImage(this.result);
      });
    }
  };
  const createNewAccount = async (e) => {
    e.preventDefault();
    if (
      !signupData.email ||
      !signupData.password ||
      !signupData.fullName ||
      !signupData.avatar
    ) {
      //alert("Please fill all the fields");
      toast.error("Please fill all the fields");
      return;
    }
    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    // dispatch create account event or actions
    const response = await dispatch(createAccount(formData));
    console.log(response);
    if (response?.payload?.success) {
      navigate("/");  // form submit hone k baad home page pr return nhi ho rha h
    }

    setSignupData({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
    });

    setPreviewImage("");
  };

  return (
    <HomeLayout>
      <div className="flex items-center justify-center  h-[100vh] ">
        <form
          noValidate
          onSubmit={createNewAccount}
          action=""
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-80 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold ">Registration Page</h1>
          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewImage ? (
              <img
                className="w-24 h-24 rounded-full m-auto"
                src={previewImage}
              />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
            )}
          </label>
          <input
            onChange={getImage}
            type="file"
            name="image_uploads"
            className="hidden"
            id="image_uploads"
            accept=".jpg, .jpeg, .png, .svg"
          />

          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="font-semibold">
              Name:{" "}
            </label>
            <input
              type="text"
              required
              name="fullName"
              id="fullName"
              placeholder="Enter Your Full Name.."
              className="bg-transparent px-2 py-1 border"
              onChange={hanldeUserInput}
              value={signupData.fullName}
            />
          </div>

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
              value={signupData.email}
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
              value={signupData.password}
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-full bg-[#3503fc] hover:bg-[#fc8c03] transition-all ease-in-out duration-300 rounded-sm px-2 py-2 font-semibold text-lg cursor-pointer"
          >
            Create account
          </button>
          <p className="text-center">
            Already have an account ?{" "}
            <Link to="/login" className="link text-accent cursor-pointer ">
              Login
            </Link>{" "}
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default SignUp;
