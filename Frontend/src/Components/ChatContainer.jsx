import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import MessageSkeleton from "./skeletons/MessageSkeleton";
// import {formatMessageTime} from "../lib/utils.js"
import profileAvatar from "../assets/defaultProfile.jpg";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useAuthStore } from "../store/useAuthStore";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser,subscribeToMessages,unsubscribeFromMessages } =useChatStore();
  const {authUser} = useAuthStore();
  const messageEndRef=useRef(null)

console.log()


  useEffect(()=>{
    if(!selectedUser?._id)return 
    getMessages(selectedUser._id)
    subscribeToMessages();
    return  ()=> unsubscribeFromMessages()
  },[selectedUser._id,getMessages,unsubscribeFromMessages,subscribeToMessages])

  // chat ended scroll
  useEffect(()=>{
    if(messageEndRef.current && messages){
      messageEndRef.current.scrollIntoView({behavior:"smooth"})
    }
  },[messages])

  if (isMessagesLoading)
    return (
      <div className=" flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  return (
    <div className=" flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        { messages.map((message) => (
          <div
          ref={messageEndRef}
           key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || profileAvatar
                      : selectedUser.profilePic || profileAvatar
                  }
                  alt="Profile Pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {new Date(message.createdAt).toLocaleTimeString()}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="attachement"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
