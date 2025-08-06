import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverScoketId, io } from "../lib/socket.js";
// function declaration
// Get All Users / Accounts
export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUser = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    return res.status(200).json(filteredUser);
  } catch (error) {
    res.status(500).json({ msg: "getUserForSidebar Error" });
    console.error(error.message);
  }
};

// Chats / Messages History
export const getMessages = async (req, res) => {
  try {
    const  userToChatId = req.params.id;
    const myId = req.user._id;
    const message = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    return res.status(200).json(message );
  } catch (error) {
    console.error("getMessages Error ", error.message);
    res.status(500).json({ msg: "getMessages Error " });
  }
};

//send Message
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const receiverId  = req.params.id;
    const senderId = req.user._id;
    console.log(senderId)

    let imageURL;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageURL = uploadResponse.secure_url;
      console.log(imageURL);
    }
    const newMessage = new Message({
      receiverId,
      senderId,
      text,
      image: imageURL,
    });

    // realtime functionality with help of socket.io
    const receiverSocketId = getReceiverScoketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    await newMessage.save();

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ msg: "getMessages Error --> Internal Server Error" });
  }
};
