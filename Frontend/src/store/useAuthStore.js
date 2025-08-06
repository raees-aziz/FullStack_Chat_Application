import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import axios from "axios";
import toast from "react-hot-toast";
import { data } from "autoprefixer";
import { io } from "socket.io-client";


const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set,get) => ({
  authUser: null,
  isSigningUp: false,
  isLogging: false,
  isUploadingProfile: false,
  isCheckingAuth: true,
  onlineUsers:[],
  socket:null,
  // function of checking login state
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
       set({ authUser: res.data });
       get().connectSocket()
    } catch (error) {
      console.error("error in checking", error.response.data.msg || error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  // function of signup account
  
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      toast.success("Account created successfully");
      set({ authUser: res.data });
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      set({ isSigningUp: false });
    }
  },
  // function of login account

  login: async (data) => {
    set({ isLogging: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Login Successfully");
      get().connectSocket()
    } catch (error) {
      toast.error(error.response.data.msg);
    } finally {
      set({ isLogging: false });
    }
  },
  // function of logout account
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket()
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  },
  // function of profile picture update
  updateProfile: async (data) => {
    set({ isUploadingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      // console.log("checking profile saved or not",res.data)
      console.log(res.data)
      toast.success("Profile updated Successfully");
    } catch (error) {
      console.log("error in profile pictire",error);
      // toast.error(error.response.data.msg);
    } finally {
      set({ isUploadingProfile: false });
    }
  },
  // Scoket connected
  connectSocket:()=>{
    const {authUser}=get()
    if(!authUser || get().socket?.connected) return;
    const socket=io(BASE_URL,{query:{
      userId:authUser._id
    }})
    socket.connect();
    set({socket:socket})
   

    socket.on("getOnlineUsers",(userIds)=>{
      set({onlineUsers:userIds})
    })
  },
  // Scoket Disconnected
  disconnectSocket:()=>{
    if(get().socket?.connected)get().socket?.disconnect()
  },
}));
