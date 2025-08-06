import React from "react";
import Sidebar from "../Components/Sidebar.jsx";
import { useChatStore } from "../store/useChatStore.js";
import NoChatSelector from "../Components/NoChatSelector.jsx";
import ChatContainer from "../Components/ChatContainer.jsx"
const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="h-screen bg-base-200">
      <div className="flex justify-center items-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelector /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
