import { Router } from "express";
import { home, readUser, createUser } from "../controllers/authController.js";

const router = Router();

router.route("/").get(home);
router.route("/register").get(readUser).post(createUser);

export default router;
