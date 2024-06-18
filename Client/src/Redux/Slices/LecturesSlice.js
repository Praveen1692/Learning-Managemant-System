import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosinstance";

const initialState = {
  //lecture: [],
  lectures: []
};

export const getCourseLecture = createAsyncThunk(
  "/course/lecture/get",
  async (cid) => {
    try {
      const response = axiosInstance.get(`/course/${cid}`);
      console.log("response data",(await response).data);
     
      toast.promise(response, {
        loading: "Fectching Courses Lectures...",
        success: "Lectures Fetch Successfully",
        error: "Faild to load lectures...",
      });
      return (await response).data;
      /*   client 
      const response = await res;
      return response.data;
      */
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("SOmething wrong to  load lectures.....");
    }
  }
);

export const addCourseLecture = createAsyncThunk(
  "/course/addlecture",
  async (data) => {
    try {
      const formData = new FormData();
      formData.append("lecture", data.lecture);
      formData.append("title", data.title);
      formData.append("description", data.description);
      console.log("this is from data ", formData);
      const response = axiosInstance.post(`/course/${data.id}`, formData);
      console.log("LectireSlice update", response);
      toast.promise(response, {
        loading: "Adding Courses Lecture...",
        success: "Lecture Added Successfully",
        error: "Faild to add  lectures...",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("Something wrong to  add lectures.....");
    }
  }
);

export const deleteCourseLecture = createAsyncThunk(
  "/course/lecture/delete",
  async (data) => {
    try {
      const response = axiosInstance.delete(
        `/course?courseId=${data.courseId}&lectureId=${data.lectureId}`
      );
      console.log("response on delete lecture",response);
      toast.promise(response, {
        loading: "Deleting Courses Lecture...",
        success: "Lecture Deleting Successfully",
        error: "Faild to Deleting  lectures...",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("SOmething wrong to  Deleting lectures.....");
    }
  }
);

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseLecture.fulfilled, (state, action) => {
        //state.lectures = action?.payload;
          state.lectures = action?.payload?.lectures; 
      })

      .addCase(addCourseLecture.fulfilled, (state, action) => {
        console.log(action);
        // state.lectures.push(action?.payload?.course?.lecture);//puch  ka function check krna hai
        state.lectures = action?.payload?.course?.lectures;
      });
  },
});
export const {} = lectureSlice.actions; // add kra hai 
export default lectureSlice.reducer;
