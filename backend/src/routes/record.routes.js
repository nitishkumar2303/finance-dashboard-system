import express from "express";
import {
  createRecord,
  getRecord,
  deleteRecord,
  updateRecord,
} from "../controllers/record.controller.js"; 
import { protect, authorizeRoles } from "../middlewares/auth.middleware.js"; 

const router = express.Router();

router.use(protect);

router.get("/", getRecord);
router.post("/", authorizeRoles("ADMIN", "ANALYST"), createRecord); 
router.delete("/:id", authorizeRoles("ADMIN"), deleteRecord); 
router.put("/:id", authorizeRoles("ADMIN"), updateRecord);

export default router; // FIX: Added the missing export!