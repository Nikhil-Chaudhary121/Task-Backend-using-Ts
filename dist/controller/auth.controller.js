"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../model/user.model")); // you'll create later
// POST /signup
const signup = async (req, res) => {
    try {
        // console.log(req.body);
        const { name, email } = req.body;
        const existingUser = await user_model_1.default.findOne({ email });
        if (existingUser)
            return res.status(200).json({ error: "User already exists" });
        // const hashedPassword = await bcrypt.hash(password, 10);
        // const user = new User({ name, email, password: hashedPassword });
        const user = new user_model_1.default({ name, email });
        await user.save();
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET || "secret", {
            expiresIn: "30d",
        });
        res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    }
    catch (err) {
        res.status(500).json({ error: "Signup failed", err });
    }
};
exports.signup = signup;
// POST /login
const login = async (req, res) => {
    // console.log(req.body);
    try {
        // const { email, password } = req.body;
        const { email } = req.body;
        const user = await user_model_1.default.findOne({ email });
        if (!user)
            return res.status(200).json({ error: "User not found" });
        // const isMatch = await bcrypt.compare(password, user.password || "");
        // console.log(isMatch);
        // if (!isMatch) return res.status(200).json({ error: "Invalid credentials" });
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET || "secret", {
            expiresIn: "30d",
        });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    }
    catch (err) {
        res.status(500).json({ error: "Login failed", err });
    }
};
exports.login = login;
const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(id);
        const user = await user_model_1.default.findById(id);
        if (!user) {
            res.status(400).send({ error: "User Not Found" });
        }
        else {
            res.status(200).json(user);
        }
    }
    catch (err) {
        res.status(400).send({ error: "Error in Getting User", err });
    }
};
exports.getUser = getUser;
