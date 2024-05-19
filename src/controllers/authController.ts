import mongoose from "mongoose";
import { Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import {
  userSignUpSchema,
  userSignInSchema,
} from "../validators/userValidator";
import jwt from "jsonwebtoken";
import { UserInfo } from "../utils/types";

export const signUp = async (req: Request, res: Response) => {
  // console.log(req.body)
  try {
    const { error, value } = userSignUpSchema.body.validate(req.body);
    console.log(value);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const {
      userName,
      firstName,
      lastName,
      phoneNo,
      email,
      userImg,
      password,
      verified,
      gender,
      isAdmin,
      state,
      city,
      address,
      vehicles
      } = value;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const newUser = new Users({
      userName,
      firstName,
      lastName,
      phoneNo,
      email,
      userImg,
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
    const { error, value } = userSignInSchema.body.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const { userName, password } = value;
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
    const info: UserInfo = user.toObject(); // Assign to the optional type
    delete info.password;
    

    return res.cookie("token", token).status(200).json({info, token: token});

    // Do something with the validated user data

    // Return  a success response
    // return res.status(200).json({
    //   success: true,
    //   message: "Sign in successful",
    // });
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
    console.log(req.headers.user);
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
