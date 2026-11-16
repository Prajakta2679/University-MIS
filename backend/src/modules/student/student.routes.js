import { Router } from "express";

import studentController from "./student.controller.js";


import {
  createStudentValidation,
  updateStudentValidation,
} from "./student.validation.js";

import validateRequest from "../../middlewares/validateRequest.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import requireRole from "../../middlewares/role.middleware.js";
import { ROLES } from "../../core/constants/roles.js";

const router = Router();

/* ===========================
   Student Profile
=========================== */

// Logged-in Student Profile
router.get(
  "/profile",
  authMiddleware,
  studentController.getProfile
);

/* ===========================
   Student CRUD
=========================== */

// Create Student — ADMIN only
router.post(
  "/",
  authMiddleware,
  requireRole(ROLES.ADMIN),
  createStudentValidation,
  validateRequest,
  studentController.create
);

// Get All Students — ADMIN or FACULTY
router.get(
  "/",
  authMiddleware,
  requireRole(ROLES.ADMIN, ROLES.FACULTY),
  studentController.getAll
);

// Get Student By ID — ADMIN or FACULTY
router.get(
  "/:id",
  authMiddleware,
  requireRole(ROLES.ADMIN, ROLES.FACULTY),
  studentController.getById
);

// Update Student — ADMIN only
router.put(
  "/:id",
  authMiddleware,
  requireRole(ROLES.ADMIN),
  updateStudentValidation,
  validateRequest,
  studentController.update
);

// Delete Student — ADMIN only
router.delete(
  "/:id",
  authMiddleware,
  requireRole(ROLES.ADMIN),
  studentController.delete
);

export default router;