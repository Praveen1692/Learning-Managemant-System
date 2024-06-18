import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosinstance";

const initialState = {
  allUsersCount: 0,
  subscribedCount: 0,
};

export const getStatsData=createAsyncThunk("stats/get",async()=>{
    try {
        const response=axiosInstance.get("/admin/stats/users");
        console.log("response  again chande stat",response);
        toast.promise(response,{
            loading:"Getting the Stats......",
            success:"Stats Loaded Successfully",
            error:"Error Loading Stats"
        })
        return (await response).data;
        
        
    } catch (error) {
        console.log("StatSlice error",error);
        toast.error(error?.response?.data?.message);
        

        
    }

})

const statSlice = createSlice({
  name: "state",
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    // add extra reducers here
    builder.addCase(getStatsData.fulfilled,(state,action)=>{
      console.log("Actions Stactslice",action);
      state.allUsersCount=action?.payload?.allUsersCount;
      state.subscribedCount=action?.payload?.subscribedUsersCount

    })
  },
});


export default statSlice.reducer;
