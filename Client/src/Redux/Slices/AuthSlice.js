import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosinstance.js";
const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false, //  true or false
  role: localStorage.getItem("role") || "", //   admin, user, guest
  data: JSON.parse(localStorage.getItem("data")) || "{}", // User Data in JSON format
};


export const changePassword = createAsyncThunk(
  "/auth/changePassword",
  async (userPassword) => {
    // /change-password
    try {
      let res = axiosInstance.post("/user/change-password", userPassword);
      console.log("Change Password response",res);

      await toast.promise(res, {
        loading: "Loading...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to change password",
      });

      // getting response resolved here
      res = await res;
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);


// function to handle forget password
export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (email) => {
    try {
      let res = axiosInstance.post("/user/reset", { email });
      console.log("Clienst forgotpassword",res);

      await toast.promise(res, {
        loading: "Loading...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to send verification email",
      });

      // getting response resolved here
      res = await res;
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);


export const resetPassword = createAsyncThunk("/user/reset", async (data) => {
  try {
    let res = axiosInstance.post(`/user/reset/${data.resetToken}`, {
      password: data.password,
    });

    toast.promise(res, {
      loading: "Resetting...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to reset password",
    });
    // getting response resolved here
    res = await res;
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});






















export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axiosInstance.post("user/register", data);
    toast.promise(res, {
      loading: "wait! creating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create account",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return;
  }
});

export const getUserdata = createAsyncThunk("/user/details", async () => {
  try {
    const res = axiosInstance.get("/user/me");
    return (await res).data;
  } catch (error) {
    toast.error(error.message);
  }
});

export const updateProfile = createAsyncThunk(
  "/user/update/profile",
  async (data) => {
    try {
      // yaha .put use kra hai ue check krnahai
      const res = axiosInstance.put(`/user/update/${data[0]}`, data[1]);
      console.log("UpdateProfile Response",res);
      toast.promise(res, {
        loading: "wait! updating your profile",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to update profile",
      });
      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return;
    }
  }
);

export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const re = axiosInstance.post("/user/login", data);
    console.log("Login Problem",re);

    console.log("Login", data);

    toast.promise(re, {
      loading: "Wait! authentication in progress...",
      success: (data) => {
        console.log("Succdddess", data.data.data.user.role);

        return data?.data?.message;
      },
      error: "Failed to login",
    });
    return await re;
    //return (await res).data.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return;
  }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = axiosInstance.post("/user/logout");
    toast.promise(res, {
      loading: "Wait logout promise",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to logout",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return;
  }
});

const authSlice = createSlice({
  //  Redux ToolKit
  name: "auth", //   a name used to identify the reducer section
  initialState, //     the initial state of the Redux store
  reducers: {}, //   A key-value pair where keys are action types and values are corresponding actions
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        console.log("login Actions",action);
        console.log("login State",state);
        localStorage.setItem(
          "data",
          JSON.stringify(action.payload.data.data.user)
        );
        localStorage.setItem("isLoggedIn", true);
        // localStorage.setItem("role", action?.payload?.user?.role);
        console.log(
          "Actions and payload and data",
          action.payload.data.data.user
        );

        localStorage.setItem("role", action.payload.data.data.user.role);

        state.isLoggedIn = true;
        state.data = action.payload.data.data.user;
        state.role = action.payload.data.data.user.role;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.data = {};
        state.isLoggedIn = false;
        state.role = "";
      })
      .addCase(getUserdata.fulfilled, (state, action) => {
        console.log("getUser",action.payload.data);
        localStorage.setItem(
          "data",
          JSON.stringify(action.payload.data)
        );
        localStorage.setItem("isLoggedIn", true);
        // localStorage.setItem("role", action?.payload?.user?.role);
        

        localStorage.setItem("role", action.payload.data.role);

        state.isLoggedIn = true;
        state.data = action.payload.data;
        state.role = action.payload.data.role;
      });
  },
});

export const {} = authSlice.actions; // Action creators are generated for each case reducer function
export default authSlice.reducer; // The reducer itself
