import { Route, Routes } from "react-router-dom";
import "./App.css";

import HomePage from "./Pages/HomePage";
import AboutUs from "./Pages/AboutUs.jsx";
import NotFound from "./Pages/NotFound.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Login from "./Pages/Login.jsx";
import CourseList from "./Pages/Courses/CourseList.jsx";
import Contact from "./Pages/Contact.jsx";
import Denied from "./Pages/Denied.jsx";
import CourseDescription from "./Pages/CourseDescription.jsx";
import RequireAuth from "./components/Auth/RequireAuth.jsx";
import CreateCourse from "./Pages/Courses/CreateCourse.jsx";
import Profile from "./Pages/User/Profile.jsx";
import EditProfile from "./Pages/User/EditProfile.jsx";
import Checkout from "./Pages/Payments/Checkout.jsx";
import CheckoutSuccess from "./Pages/Payments/CheckoutSuccess.jsx";
import CheckoutFail from "./Pages/Payments/CheckoutFail.jsx";
import DisplayLectures from "./Pages/Dashboard/DisplayLectures.jsx";
import AddLecture from "./Pages/Dashboard/AddLecture.jsx";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard.jsx";
import ChangePassword from "./Pages/Password/ChangePassword.jsx";
import ForgotPassword from "./Pages/Password/ForgotPassword.jsx";
import ResetPassword from "./Pages/Password/ResetPassword.jsx";



function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpassword" element={<ForgotPassword />} />
          <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/contact" element={<Contact />} />-
          <Route path="/denied" element={<Denied />} />
          <Route path="/course/description/" element={<CourseDescription />} />
          <Route path="/required" element={<RequireAuth />} />
          <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
            <Route path="/course/create" element={<CreateCourse />} />
            <Route path="/course/addlecture" element={<AddLecture/>}/>
            <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
          </Route>
          <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/editprofile" element={<EditProfile />} />

            <Route path="/checkout" element={<Checkout />} />

            <Route path="/checkout/success" element={<CheckoutSuccess />} />

            <Route path="/checkout/fail" element={<CheckoutFail />} />


            <Route path="/course/displaylectures" element={<DisplayLectures/>}/>

            <Route path="/changepassword" element={<ChangePassword/>} />
            

           

           


           
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
