import React, { useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { getUserdata, updateProfile } from "../../Redux/Slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    previewImage: "",
    fullName: "",
    avatar: undefined,
    userId: useSelector((state) => state?.auth?.data?._id),
  });
  const handleImageUpload = (e) => {
    console.log("Image upload function");
    e.preventDefault();
    const uploadImage = e.target.files[0];
   
    if (uploadImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", () => {
        setData({
          ...data,
          previewImage: fileReader.result,
          avatar: uploadImage,
        });
      });
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (!data.fullName || !data.avatar) {
      toast.error("Please fill all the fields");
      return;
    }
    const formData = new FormData();

    formData.append("avatar", data.avatar);
    formData.append("fullName", data.fullName);
    await dispatch(updateProfile([data.userId, formData]));
    await dispatch(getUserdata());
    navigate("/user/profile");
  };
  console.log("Console log");

  return (
    <HomeLayout>
      <div className="flex items-center  justify-center h-[100vh]">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-semibold ">Edit Profile</h1>
          <label className="cursor-pointer  " htmlFor="image_uploads">
            {data.previewImage ? (
              <img
                className="w-28 h-28 rounded-full m-auto"
                src={data.previewImage}
                onChange={handleImageUpload}
                alt="Image"
              />
            ) : (
              <BsPersonCircle className="w-28 h-28 rounded-full m-auto " />
            )}
          </label>
          <input
            className="hidden"
            onChange={handleImageUpload}
            type="file"
            id="image_uploads"
            name="image_uploads"
            accept=".jpg, .png, .jpeg , .svg"
          />
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="text-lg font-semibold">
              Full Name
            </label>
            <input
              required
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter Your Name.."
              className="bg-transparent px-2 py-1 border"
              value={data.fullName}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-400 transition-all ease-in-out duration-300 rounded-sm py-2 text-lg cursor-pointer "
          >
            Update Profile
          </button>

          <Link to="/user/profile">
            <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2 ">
            <AiOutlineArrowLeft />  Go Back To Profile
            </p>
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
}

export default EditProfile;
