import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    category: "",
    createdBy: "",
    thumbnail: null,
    previewImage: "",
  });
  const handleImageUpload = (e) => {
    e.preventDefault();
    const uploadImage = e.target.files[0];
    if (uploadImage) {
      const fileReader = new FileReader(); // check what FileReader do
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", function () {
        // preeviewImage:this.result
        setUserInput({
          ...userInput,
          thumbnail: uploadImage,
          previewImage: fileReader.result,
        });
      });
    }
  };
  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (
      !userInput.title ||
      !userInput.createdBy ||
      !userInput.description ||
      !userInput.thumbnail
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    const response = await dispatch(createNewCourse(userInput));
    console.log("Create COurse");
    console.log("response payload",response.payload.status=='success');
    if (response.payload.status=='success') {
     
      toast.success("Course Created Successfully");
      setUserInput({
        title: "",
        description: "",
        category: "",
        createdBy: "",
        thumbnail: null,
        previewImage: "",
      });
      
      navigate("/courses");
    }
  };
  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh] ">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative"
        >
          <Link className="absolute top-8 text-2xl link text-accent cursor-pointer ">
            <AiOutlineArrowLeft />
          </Link>
          <h1 className="text-center text-2xl font-bold ">Create New Course</h1>
          <main className="grid grid-cols-2 gap-x-10 ">
            <div className="gap-y-6">
              <div>
                <label htmlFor="image_uploads" className="cursor-pointer">
                  {userInput.previewImage ? (
                    <img
                      src={userInput.previewImage}
                      alt="Course_Image"
                      className="w-full h-44 m-auto border"
                    />
                  ) : (
                    <div className="w-full h-44 m-auto flex items-center justify-center border ">
                      <h1 className="font-bold text-lg ">
                        Upload Your Course Thumbnail
                      </h1>
                    </div>
                  )}
                </label>
                <input
                  className="hidden"
                  type="file"
                  id="image_uploads"
                  accept=".jpg,.jpeg,.png"
                  name="image_uploads"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="title">
                  Course Title:
                </label>
                <input
                  required
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter Your Course Title.."
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.title}
                  onChange={handleUserInput}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 ">
              <div className="flex flex-col gap-1 ">
                <label className="text-lg font-semibold" htmlFor="createdBy">
                  Course Instructor :
                </label>
                <input
                  required
                  type="text"
                  name="createdBy"
                  id="createdBy"
                  placeholder="Enter Your Course Instructor Name. .."
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.createdBy}
                  onChange={handleUserInput}
                />
              </div>

              <div className="flex flex-col gap-1 ">
                <label className="text-lg font-semibold" htmlFor="category">
                  Course Category :
                </label>
                <input
                  required
                  type="text"
                  name="category"
                  id="category"
                  placeholder="Enter Your Course Category Name ..."
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.category}
                  onChange={handleUserInput}
                />
              </div>

              <div className="flex flex-col gap-1 ">
                <label className="text-lg font-semibold" htmlFor="description">
                  Course Description :
                </label>
                <textarea
                  required
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter Your Course Description  ..."
                  className="bg-transparent px-2 h-24 overflow-y-scroll resize-none  py-1 border"
                  value={userInput.description}
                  onChange={handleUserInput}
                />
              </div>
            </div>
          </main>
          <button type="submit" className="w-full py-2 rounded-sm font-semibold text-lg bg-yellow-600 hover:bg-yellow-500 transition-all ease-out duration-300">Create Course </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default CreateCourse;
