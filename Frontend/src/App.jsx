import React, { useEffect } from "react";
// link and routing
import { Navigate, Route, Routes } from "react-router-dom";
// pages and components
import Navbar from "./Components/Navbar.jsx";
import HomePage from "./Pages/HomePage.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Login from "./Pages/Login.jsx";
import Settings from "./Pages/Settings.jsx";
import Profile from "./Pages/Profile.jsx";
// state managment
import { useAuthStore } from "./store/useAuthStore.js";
import { useThemeStore } from "./store/useThemeStore.js";
//  UI and icons
import { Loader, LoaderPinwheel } from "lucide-react";
import { Toaster } from "react-hot-toast";
const App = () => {
  const { authUser, checkAuth, isCheckingAuth,onlineUsers } = useAuthStore();
  const {theme}=useThemeStore()

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  //
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-15 animate-spin" />
        {/* <LoaderPinwheel className="size-15 animate-spin" /> */}
      </div>
    );
  }
  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<Settings />} />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
