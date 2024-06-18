import React, { useEffect, useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/Slices/AuthSlice";
import { addCourseLecture } from "../../Redux/Slices/LecturesSlice";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";

function AddLecture() {
  const courseDetails = useLocation().state;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    id: courseDetails._id,
    lecture: undefined,
    title: "",
    description: "",
    videoSrc: "",
  });
  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }
  function handleVideo(e) {
    const video = e.target.files[0];
    const source = window.URL.createObjectURL(video);
    console.log("Souce change",source);
    setUserInput({
      ...userInput,
      lecture: video,
      videoSrc: source,
    });
  }
  async function onFormSubmit(e) {
    e.preventDefault();
    if (!userInput.lecture || !userInput.description || !userInput.title) {
      toast.error("Please Fill All The Fields..");
      alert("Please fill all the fields");
      return;
    }
    const response = await dispatch(addCourseLecture(userInput));
    console.log("AddLecture Response",response);
    if (response?.payload?.success) {
      navigate(-1)
      setUserInput({
        id: courseDetails._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: "",
      });
    }
  }
  useEffect(() => {
    if (!courseDetails) {
      navigate("/courses");
    }
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx-16">
        <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-md ">
          <header className="flex items-center justify-center relative ">
            <button
              className="absolute left-2 text-xl text-green-400"
              onClick={() => navigate(-1)}
            >
              <AiOutlineArrowLeft />
            </button>
            <h1 className="text-xl text-yellow-500 font-semibold ">
              Add new lectures
            </h1>
          </header>
          <form onSubmit={onFormSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              name="title"
              placeholder="Enter The Title Of The Lecture.."
              onChange={handleInputChange}
              className="bg-transparent px-3 py-1 border"
              value={userInput.title}
            />

            <textarea
              type="text"
              name="description"
              placeholder="Enter The Description  Of The Lecture.."
              onChange={handleInputChange}
              className="bg-transparent px-3 py-1 border resize-none overflow-y-scroll h-36 "
              value={userInput.description}
            />
            {userInput.videoSrc ? (
              <video
                src={userInput.videoSrc}
                controls
                muted
                controlsList="nodownload"
                disablePictureInPicture
                className="object-fill rounded-tl-lg rounded-tr-lg w-full "
              ></video>
            ) : (
              <div className="h-48 flex items-center justify-center cursor-pointer ">
                <label className="font-semibold text-xl cursor-pointer" htmlFor="lecture">Choose your video.</label>
                <input type="file" className="hidden" id="lecture" name="lecture" onChange={handleVideo} accept="video/mp4 video/x-mp4" />
              </div>
            )}
            <button type="submit" className="btn btn-primary py-1 font-semibold text-lg">Add New lecture</button>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AddLecture;
