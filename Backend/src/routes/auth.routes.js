import express from "express";
import {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
} from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);

export default router;

// import express from "express";
// import {
//   signup,
//   login,
//   logout,
//   updateProfile,
//   checkAuth,
// } from "../controller/auth.controller.js";
// import { protectRoute } from "../middleware/auth.middleware.js";

// const router = express.Router();

// express.Router().post("/signup", signup);
// express.Router().post("/login", login);
// express.Router().post("/logout", logout);

// express.Router().put("/update-profile", protectRoute, updateProfile);
// express.Router().get("/check", protectRoute, checkAuth);

// export default router;
