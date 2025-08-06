import jwt from "jsonwebtoken";

export function generateToken(userID, res) {
  const token = jwt.sign({ userID }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
  return token;
}

// export function verifyToken(token) {
//   const decoded = jwt.verify(token, process.env.SECRET_KEY);
//   return console.log(decoded);
// }
