import React, { useEffect, useState } from "react";

import HomeLayout from "../../Layouts/HomeLayout.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourseLecture,
  getCourseLecture,
} from "../../Redux/Slices/LecturesSlice.js";

function DisplayLectures() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);
  const [currentVideo, setCurrentVideo] = useState(0);
  async function onLectureDelete(courseId, lectureId) {
    console.log("delete lecture called");
    console.log(courseId, lectureId);
    await dispatch(
      deleteCourseLecture({ courseId: courseId, lectureId: lectureId })
    );
    await dispatch(getCourseLecture(courseId));
  }

  useEffect(() => {
    console.log("State",state);
    console.log("Role",role);
   console.log("lectures change corect again  ",lectures);
   

    if (!state) navigate("/courses");
    dispatch(getCourseLecture(state._id));
    /*  
     (async () => {
      await dispatch(getCourseLecture(courseDetails._id)); itna he hai bs
    })();

    */



  }, []);
  return (
    <HomeLayout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-">
        <div className="text-center text-2xl font-semibold text-yellow-500 ">
          Course Name:{state?.title}
        </div>
        <div className="flex justify-center gap-10 w-full ">
          {/* left section for playing videoes and display course details to a admin    */}
          <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] ">
            <video
              src={lectures && lectures[currentVideo]?.lecture?.secure_url}
              className="object-fill rounded-tl-lg rounded-tr-lg w-full"
              controls
              disablePictureInPicture
              muted
              controlsList="nodownload"
            ></video>
            <div>
              <h1>
                <span className="text-yellow-500 ">
                  Title:{lectures && lectures[currentVideo]?.title}
                </span>
              </h1>
              <p>
                <span className="text-yellow-400 line-clamp-4">
                  Description:{lectures && lectures[currentVideo]?.description}
                </span>
              </p>
            </div>
          </div>

          {/*Right Section for display lectures... */}
          <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4 ">
            <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between  ">
              <p>Lectures List</p>
              {role == "ADMIN" && (
                <button onClick={()=>navigate("/course/addlecture",{state:{...state}})} className="btn-primary px-2 py-1 rounded-md font-semibold text-sm ">
                  Add New Lectures
                </button>
              )}
            </li>
            {lectures &&
              lectures.map((lecture, idx) => {
                return (
                  <li key={lecture._id} className="space-y-2 ">
                    <p
                      className="cursor-pointer"
                      onClick={() => setCurrentVideo(idx)}
                    >
                      <span> Lecture {idx + 1} : </span>
                      {lecture?.title}
                    </p>
                    {role == "ADMIN" && (
                      <button
                        onClick={() => onLectureDelete(state._id, lecture._id)}
                        className="btn-danger px-2 py-1 rounded-md font-semibold text-sm "
                      >
                        Delete Lectures
                      </button>
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </HomeLayout>
  );
}

export default DisplayLectures;
