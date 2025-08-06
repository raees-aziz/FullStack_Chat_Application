import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

// API for signup
export const signup = async (req, res) => {
  const { email, fullName, password } = req.body;

  try {
    if (!email || !fullName || !password)
      return res.status(400).json({ msg: "All Fields are Required" });
    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters" });

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "Email Already Exist" });

    const hashPassword = await bcrypt.hash(password, 10);
    console.log("hashPassword : ", hashPassword);

    const newUser = new User({ fullName, email, password: hashPassword });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
    } else {
      return res.status(400).json({ msg: "Invalid User Data" });
    }

    return res
      .status(200)
      .json({ msg: "User Create Successfully", data: newUser });
  } catch (error) {
    console.error("sign-up", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// API for login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ msg: "All Field are Required" });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ msg: "Invalid Credentials" });

    generateToken(user._id, res);
    return res.status(200).json({ data: user });
  } catch (error) {
    console.error("login", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// API for logout
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ msg: "Loggout Successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// updating Profile Picture
export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic)
      return res.status(400).json({ msg: "Profile Pic is required" });
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ msd: "updateProfile --->  Internal Server Error " });
    console.error(error.message);
  }
};

// check auth after page refresh

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ msg: "checkAuth ==> Internal Server Error" });
    console.error("err check auth --->", error.message);
  }
};
