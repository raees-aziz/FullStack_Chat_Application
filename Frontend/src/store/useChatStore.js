import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  // get all user function
  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      // console.log("users",res.data)
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.messages);
    } finally {
      set({ isUserLoading: false });
    }
  },

  // get meassage function
  getMessages: async (userID) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userID}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.messages);
    } finally {
      set({ isMessageLoading: false });
    }
  },

  // send meassage function
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.error("sendMessage error", error);
      toast.error(error.response.data.message);
    }
  },

  // real time chat (socket)
  subscribeToMessages: () => {
  const { selectedUser } = get();
  if (!selectedUser?._id) return;

  const socket = useAuthStore.getState().socket; // ✅ correct
  if (!socket) return;

  console.log("socket", socket);
  socket.on("newMessage", (newMessage) => {
    set({ messages: [...get().messages, newMessage] });
  });
},


  unsubscribeFromMessages: () => {
  const socket = useAuthStore.getState().socket;
  if (socket) {
    socket.off("newMessage");
  }
},


  // selected userer function
  setSelectedUser: (user) => set({ selectedUser: user }),
}));
