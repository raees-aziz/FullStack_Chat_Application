import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ msg: "Unauthorizet and Token Not Provided" });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded)
      return res.status(401).json({ msg: "Unauthorizet and Token Invalid" });

    const user = await User.findById(decoded.userID).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ msg: "catch err : Internal server error" });
    console.error("middleware protected-Route", error.message);
  }
};
