import express from "express";
import {
  createRecord,
  getRecord,
  deleteRecord,
    updateRecord,
} from "../controllers/recordController.js";
import { protect, authenticate } from "../middleware.js";
import { authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getRecord);
router.post("/", authorizeRoles("ADMIN", "ANALYST"), getRecord);
router.delete("/", authorizeRoles("ADMIN"), deleteRecord);
router.put("/:id", authorizeRoles("ADMIN"), updateRecord);
