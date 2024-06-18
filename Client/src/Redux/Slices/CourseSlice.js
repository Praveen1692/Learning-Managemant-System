import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosinstance";

const initialState = {
  courseData: [],
};

export const getAllCourse = createAsyncThunk("/course/get", async () => {
  try {
    const response = axiosInstance.get("/course");
    console.log("Get All course",response);
    toast.promise(response, {
      loading: "Loading Course Data....",
      success: "Course Loaded Successfully",
      error: "Failed To Get The Courses..",
    });
    return (await response).data.data; // pura data nhi lana hai data.course krna hai baad m
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
  try {
    const response = axiosInstance.delete(`/course/${id}`);
    console.log("frotend delete  course response",(await response).data);
    toast.promise(response, {
      loading: "Deleting Course Data....",
      success: "Course Deleted Successfully",
      error: "Failed To Delete The Course..",
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const createNewCourse = createAsyncThunk(
  "/course/create",
  async (data) => {
    try {
      let formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("createdBy", data.createdBy);
      formData.append("category", data.category);
      formData.append("thumbnail", data.thumbnail);
      const response = axiosInstance.post("/course", formData);
      console.log("Response", (await response).data.status);
      toast.promise(response, {
        loading: "Creating Course....",
        success: "Course Created Successfully",
        error: "Failed To Create The Course..",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourse.fulfilled, (state, action) => {
      if (action.payload) {
        console.log("Courses Change fourth");
        console.log(action.payload);
        state.courseData = [...action.payload];
      }
    });
  },
});

export default courseSlice.reducer;
