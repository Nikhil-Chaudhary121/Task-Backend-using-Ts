import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.model"; // you'll create later
import { error, log } from "console";

// POST /signup
export const signup = async (req: Request, res: Response) => {
  try {
    // console.log(req.body);
    const { name, email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(200).json({ error: "User already exists" });

    // const hashedPassword = await bcrypt.hash(password, 10);

    // const user = new User({ name, email, password: hashedPassword });
    const user = new User({ name, email });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret", {
      expiresIn: "30d",
    });

    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });

  } catch (err) {
    res.status(500).json({ error: "Signup failed", err });
  }
};

// POST /login
export const login = async (req: Request, res: Response) => {
  // console.log(req.body);
  
  try {
    // const { email, password } = req.body;
    const { email} = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(200).json({ error: "User not found" });

    // const isMatch = await bcrypt.compare(password, user.password || "");
    // console.log(isMatch);
    
    // if (!isMatch) return res.status(200).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret", {
      expiresIn: "30d",
    });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Login failed", err });
  }
};

export const getUser = async (req: Request , res: Response)=>{
  try {
    const id = req.params.id;
    // console.log(id);
    
    const user = await User.findById(id);
    if(!user){
      res.status(400).send({error : "User Not Found"})
    }else{
      res.status(200).json(user)
    }

    
  } catch (err) {
    res.status(400).send({error : "Error in Getting User" , err})
  }
}