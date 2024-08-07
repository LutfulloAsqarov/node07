import express from "express";
import BlogsController from "../controller/blog.js";
import UsersController from "../controller/user.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router.get("/api/blogs", [auth], BlogsController.get);
router.post("/api/blogs", [auth], BlogsController.create);

router.get("/api/profile", [auth], UsersController.getProfile);
router.patch("/api/updateProfile", [auth], UsersController.updateProfile);
router.patch("/api/updatePassword", [auth], UsersController.updatePassword);
router.get("/api/users", UsersController.getAllUsers);
router.post("/api/users/sign-up", UsersController.registerUser);
router.post("/api/users/sign-in", UsersController.loginUser);
router.patch("/api/users/:id", UsersController.updateUser);

export default router;
