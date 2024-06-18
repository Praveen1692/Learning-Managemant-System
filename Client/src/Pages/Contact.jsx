import React, { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import toast from "react-hot-toast";
import axiosInstance from "../Helpers/axiosinstance";
import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });
  function handleInputChange(event) {
    setUserInput({ ...userInput, [event.target.name]: event.target.value });
  }
  async function onFormSubmit(e) {
    console.log(userInput);
    e.preventDefault();
    if (!userInput.name || !userInput.email || !userInput.message) {
      toast.error("All fields are required..");
      return;
    }
    try {
      const response = axiosInstance.post("/contact", userInput);
      toast.promise(response, {
        loading: "Submitting your msg",
        success: "Form submitted successfully",
        error: "Failed to submit the form",
      });
      const contactResponse = await response;
      if (contactResponse?.data?.success) {
        setUserInput({
          name: "",
          email: "",
          message: "",
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("operation failed");
    }
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          noValidate
          onSubmit={onFormSubmit}
          className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]"
        >
          <h1 className="text-3xl font-semibold ">Contact Form </h1>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="name" className="text-xl font-semibold">
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-transparent border px-2 py-1 rounded-sm"
              placeholder="Enter your name..."
              onChange={handleInputChange}
              value={userInput.name}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="email" className="text-xl font-semibold">
              E-mail:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-transparent border px-2 py-1 rounded-sm"
              placeholder="Enter your email..."
              onChange={handleInputChange}
              value={userInput.email}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="message" className="text-xl font-semibold">
              Message:
            </label>
            <textarea
              name="message"
              id="message"
              className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
              placeholder="Enter your Message..."
              onChange={handleInputChange}
              value={userInput.message}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-red-700 transition-all ease-in-out duration-300 rounded-xl py-2 font-semibold text-lg cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Contact;
