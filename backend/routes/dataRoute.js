import { Router } from "express";
import { createData } from "../controllers/dataController.js";
import { readData } from "../controllers/dataController.js";
import { deleteData } from "../controllers/dataController.js";
import { readDataById } from "../controllers/dataController.js";
import { updateData } from "../controllers/dataController.js";
import { deleteAll } from "../controllers/dataController.js";

const router = Router();

router.route("/data").get(readData).post(createData);
router.delete("/data/deleteAll", deleteAll);
router.route("/data/:id").get(readDataById).put(updateData).delete(deleteData);

export default router;
