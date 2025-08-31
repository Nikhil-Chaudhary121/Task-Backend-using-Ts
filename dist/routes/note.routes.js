"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const note_controller_1 = require("../controller/note.controller");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = (0, express_1.Router)();
// All note routes require auth
router.post("/", auth_middleware_1.default, note_controller_1.createNote);
router.get("/", auth_middleware_1.default, note_controller_1.getNotes);
router.put("/:id", auth_middleware_1.default, note_controller_1.updateNote);
router.delete("/:id", auth_middleware_1.default, note_controller_1.deleteNote);
exports.default = router;
