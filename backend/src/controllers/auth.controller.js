import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';


export const checkAuth = (req, res) => {
    console.log(req.user);
    
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in check authentication controller");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const signup = async (req,res) => {
    const {username,password,email} = req.body;
    try {
        if(!username || !password || !email){
            return res.status(400).json({message:"All fields are required"});
        }
        if(password.length < 8){
            return res.status(400).json({message:"Password must be atleast 8 charecters"});
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exist"});
        }

        const salt = await  bcrypt.genSalt(10);
        const hashedPasswd = await bcrypt.hash(password,salt);

        const newUser = new User({
            username,
            email,
            password:hashedPasswd
        });

        await newUser.save();
        generateToken(newUser._id,res);

        return res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
        });
    } catch (error) {
        console.log("Error in signup (authControllerjs) :",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export const signin = async (req,res) => {
    const {email,password} = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }

        generateToken(user._id,res);

        return res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    } catch (error) {
        console.log("Error in signin (authControllerjs) :",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}