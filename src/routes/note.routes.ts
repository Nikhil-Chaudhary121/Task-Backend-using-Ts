import { Router } from "express";
import { createNote, getNotes, updateNote, deleteNote } from "../controller/note.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

// All note routes require auth
router.post("/", authMiddleware, createNote);
router.get("/", authMiddleware, getNotes);
router.put("/:id", authMiddleware, updateNote);
router.delete("/:id", authMiddleware, deleteNote);

export default router;
