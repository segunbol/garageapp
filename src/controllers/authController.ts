
import { Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { CreateUserData, SignInUserData, UserInfo } from "../types";

export const signUp = async (req: Request, res: Response) => {
  try {
    const payload = <CreateUserData>req.body;
    
    const {
      userName,
      firstName,
      lastName,
      phoneNo,
      email,
      password,
      verified,
      gender,
      isAdmin,
      state,
      city,
      address,
      vehicles
      } = payload;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const newUser = new Users({
      userName,
      firstName,
      lastName,
      phoneNo,
      email,
      password: hashedPassword,
      verified,
      gender,
      isAdmin,
      state,
      city,
      address,
      vehicles
    });
    const savedUser = await newUser.save();
    const userId = savedUser._id;
    const userEmail = savedUser.email;

    res.status(200).json(savedUser);
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const payload = <SignInUserData>req.body;
    
    const { userName, password } = payload;
    const user = await Users.findOne({ userName: userName });
    if (!user) {
      return res.status(404).json("User not found!");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json("Wrong credentials!");
    }
    const SECRET = process.env.SECRET || "";
    const token = jwt.sign(
      { _id: user._id, userName: user.userName, isAdmin: user.isAdmin },
      SECRET,
      { expiresIn: "1d" }
    );
    const info: UserInfo = user.toObject();
    delete info.password;
    

    return res.cookie("token", token).status(200).json({info, token: token});

  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const signOut = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    delete req.user;
    return res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .send(`User logged out successfully!`);
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
