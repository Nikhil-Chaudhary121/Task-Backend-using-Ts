"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.getNotes = exports.createNote = void 0;
const note_model_1 = __importDefault(require("../model/note.model"));
const user_model_1 = __importDefault(require("../model/user.model"));
// POST /notes
const createNote = async (req, res) => {
    try {
        const checUser = await user_model_1.default.findById(req.user);
        if (!checUser) {
            res.status(400).send({ error: "User is not Found" });
        }
        // console.log(checUser);
        const title = req.body.title;
        const user = checUser?._id;
        console.log(title);
        const note = new note_model_1.default({ title, user });
        await note.save();
        // console.log(note);
        res.status(201).json(note);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create note", error });
    }
};
exports.createNote = createNote;
// GET /notes
const getNotes = async (req, res) => {
    try {
        const notes = await note_model_1.default.find({ user: req.user });
        res.json(notes);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch notes", error });
    }
};
exports.getNotes = getNotes;
// PUT /notes/:id
const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const updatedNote = await note_model_1.default.findByIdAndUpdate(id, { content }, { new: true });
        if (!updatedNote)
            return res.status(404).json({ message: "Note not found" });
        res.status(200).json(updatedNote);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update note", error });
    }
};
exports.updateNote = updateNote;
// DELETE /notes/:id
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNote = await note_model_1.default.findOneAndDelete({ _id: id, user: req.user });
        if (!deletedNote)
            return res.status(404).json({ message: "Note not found" });
        res.json({ message: "Note deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete note", error });
    }
};
exports.deleteNote = deleteNote;
