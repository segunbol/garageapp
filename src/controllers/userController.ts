import express, { Request, Response } from "express";
import Users from "../models/userModel";
import { UpdateUserData, UserInfo } from "../types";
import bcrypt from "bcryptjs";
import { PaginateOptions } from 'mongoose';


export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { search, sort, page = 1, limit = 10, start, end, all } = req.query;

    // Create a filter object for the search query if provided
    const filter: any = {};
    if (search) {
      filter.$or = [
        { userName: { $regex: search, $options: 'i' } },
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Handle date range filtering if provided
    if (start && end) {
      filter.createdAt = { $gte: new Date(start as string), $lte: new Date(end as string) };
    }

    // Determine the sorting criteria
    const sortOptions: any = {};
    if (sort) {
      const [field, order] = (sort as string).split(':');
      if (field && order) {
        sortOptions[field] = order === 'desc' ? -1 : 1;
      }
    }

    // Pagination settings
    const options = {
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      sort: sortOptions
    };

    // Fetch all users if 'all' is specified, otherwise apply pagination
    let users;
    if (all) {
      users = await Users.find(filter).sort(sortOptions).exec();
    } else {
      users = await Users.paginate(filter, options); // Assuming you use mongoose-paginate
    }

    return res.json({
      success: true,
      users
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  } 
};

export const getUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const userId = req.params.id;
      const user = await Users.findById(userId); 
  
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
  
      return res.status(200).json(user);
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };

  export const updateUser = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      if (req.user._id != req.params.id) {
        return res.status(400).json({
          success: false,
          message: "Not Permitted",
        });
      }
  
      const payload = <UpdateUserData>req.body;
  
      if (payload.password) {
        const salt = await bcrypt.genSalt(10);
        payload.password = await bcrypt.hash(payload.password, salt);
      }
  
      const updatedUser = await Users.findByIdAndUpdate(
        req.params.id,
        { $set: payload },
        { new: true, runValidators: true }
      );
  
      if (updatedUser) {
        return res.json({ message: "User Updated", user: updatedUser });
      } else {
        return res.status(404).json({ message: "User Not Found" });
      }
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
