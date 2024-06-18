import React, { useEffect } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
//731073
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import {
  Chart as ChartJS,
  ArcElement,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { Pie, Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { deleteCourse, getAllCourse } from "../../Redux/Slices/CourseSlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice";
import { deleteCourseLecture } from "../../Redux/Slices/LecturesSlice";

import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allUsersCount, subscribedCount } = useSelector((state) => state.stat);
  const { allPayments, monthliSalesRecord } = useSelector(
    (state) => state.razorpay
  );

  const userData = {
    labels: ["Registered User", "Enrolled User"],
    datasets: [
      {
        label: "User Details",
        data: [allUsersCount, subscribedCount],
        backgroundColor: ["#FF69B4", "#33CC33"],
        borderColor: ["#FF69B4", "#33CC33"],
        borderWidth: 1,
      },
    ],
  };
  const salesSData = {
    label: [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],

    datasets: [
      {
        label: "Sales / Month",
        data: monthliSalesRecord,
        backgroundColor: ["green"],
        borderColor: ["yellow"],

        borderWidth: 1,
      },
    ],
  };

  const myCourses = useSelector((state) => state?.course?.courseData);

  async function onCourseDelete(id) {
    if (window.confirm("Are you sure you want to delete the course ?")) {
      const res = await dispatch(deleteCourse(id));
      console.log("Res", res);
      if (res?.payload?.success) {
        await dispatch(getAllCourse());
      }
    }
  }

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourse());
      await dispatch(getStatsData());
      await dispatch(getPaymentRecord());
    })();
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">
        <h1 className="text-center text-5xl font-semibold text-yellow-500 ">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-2 gap-5 m-auto mx-10">
          <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
            <div className="w-80 h-80">
              <Pie data={userData} />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold ">Registered Users</p>
                  <h3 className="text-4xl font-bold">{allUsersCount}</h3>
                </div>
                <FaUsers className="text-yellow-600 text-5xl " />
              </div>

              <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold ">Subscribed Users</p>
                  <h3 className="text-4xl font-bold">{subscribedCount}</h3>
                </div>
                <FaUsers className="text-green-600 text-5xl " />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-10 p-5 shadow-xl rounded-md">
            <div className="h-80 w-full relative">
              <Bar
                className="absolute bottom-0 h-80 w-full "
                data={salesSData}
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold ">Subscription Count</p>
                  <h3 className="text-4xl font-bold">{allPayments?.count}</h3>
                </div>
                <FcSalesPerformance className="text-yellow-600 text-5xl " />
              </div>

              <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold ">Total Revenue</p>
                  <h3 className="text-4xl font-bold">
                    {allPayments?.count * 499}
                  </h3>
                </div>
                <GiMoneyStack className="text-green-600 text-5xl  hover:bg-yellow-600 transition-all ease-in-out  " />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-center text-3xl font-semibold ">
              Courses Overview
            </h1>
            <button
              className="w-fit cursor-pointer bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-sm py-2 px-4"
              onClick={() => navigate("/course/create")}
            >
              Create New Course
            </button>
          </div>
          <table className="table overflow-x-scroll">
            <thead>
              <tr className="text-2xl font-semibold text-neutral-100 bg-yellow-400">
                <th>S No.</th>
                <th>Course Title</th>
                <th>Course Category</th>
                <th>Instructor</th>
                <th>Total Lectures</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myCourses.map((course, idx) => {
                return (
                  <tr key={course._id}>
                    <td>{idx + 1}</td>
                    <td>
                      {" "}
                      <textarea
                        readOnly
                        value={course?.title}
                        className="w-40 h-auto bg-transparent resize-none"
                      ></textarea>{" "}
                    </td>
                    <td>{course?.category}</td>
                    <td>{course?.createdBy}</td>
                    <td>{course?.numberOfLectures}</td>
                    <td className="max-w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                      <textarea
                        value={course?.description}
                        readOnly
                        className="w-80 h-auto bg-transparent resize-none "
                      ></textarea>
                    </td>
                    <td className="flex items-center gap-4">
                      <button
                        className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold "
                        onClick={() =>
                          navigate("/course/displaylectures", {
                            state: { ...course },
                          })
                        }
                      >
                        <BsCollectionPlayFill />
                      </button>

                      <button
                        className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold "
                        onClick={() => onCourseDelete(course?._id)}
                      >
                        <BsTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AdminDashboard;
