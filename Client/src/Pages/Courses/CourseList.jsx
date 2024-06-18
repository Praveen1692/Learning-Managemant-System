import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCourse } from "../../Redux/Slices/CourseSlice.js";
import HomeLayout from "../../Layouts/HomeLayout";
import CourseCard from "../../components/CourseCard.jsx";

function CourseList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseData } = useSelector((state) => state.course);
  async function loadCourse() {
    await dispatch(getAllCourse());
  }
  useEffect(() => {
    loadCourse();
  }, []);
  return (
    <div>
      <HomeLayout>
        <div className="min-h-[90vh] pt-12 pl-20  flex-col gap-10 text-white">
          <h1 className="text-center text-2xl font-semibold mb-5">
            Explore The Courses Made by
            <span className="font-bold text-yellow-600 ">
              Industry experts{" "}
            </span>
          </h1>
          <div className="mb-10 flex flex-wrap gap-14">
            {courseData?.map((element) => {
              return <CourseCard key={element._id} data={element} />;
            })}
          </div>
        </div>
      </HomeLayout>
    </div>
  );
}

export default CourseList;
