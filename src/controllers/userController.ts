import express, { Request, Response } from "express";
import Users from "../models/userModel";
import { UpdateUserData, UserInfo } from "../types";
import bcrypt from "bcryptjs";
import { PaginateOptions } from 'mongoose';


// export const getAllUsers = async (
//     req: Request,
//     res: Response
//   ): Promise<Response> => {
//     try {
//       const { search, sort=1, page = 1, limit = 10, start, end, all } = req.query;
//       const regex = new RegExp(search as string || '', 'i');
//       const filter: any = {
//         $or: [
//           { firstName: { $regex: regex } },
//           { lastName: { $regex: regex } },
//           { email: { $regex: regex } },
//           { userName: { $regex: regex } },
//           { phoneNo: { $regex: regex } },
//         ],
//       };
  
//       // Adding additional filters if provided
      
//       if (start || end) {
//         filter.createdAt = {};
//         if (start) {
//           filter.createdAt.$gte = new Date(start as string);
//         }
//         if (end) {
//           filter.createdAt.$lte = new Date(end as string);
//         }
//       }
  
//       const customLabels = {
//         totalDocs: 'totalItems',
//         docs: 'users',
//         limit: 'perPage',
//         page: 'currentPage',
//         nextPage: 'next',
//         prevPage: 'prev',
//         totalPages: 'pageCount',
//         pagingCounter: 'pagingCounter',
//         meta: 'paginator'
//       };
  
//       const options: PaginateOptions = {
//         page: parseInt(page as string, 10),
//         limit: parseInt(limit as string, 10),
//         sort: sort as string || '',
//         customLabels,
//         populate: 'vehicles',
//         lean: !all, // If all is true, don't use lean for optimization
//       };
  
//       const allUsers = await Users.paginate(filter, options);
  
//       return res.status(200).json(allUsers);
//     } catch (err: any) {
//       return res.status(500).json({
//         success: false,
//         message: err.message,
//       });
//     }
//   };

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
  
      const info: UserInfo = user.toObject();
      delete info.password;
  
      return res.status(200).json(info);
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


// export const updateUser = async (
//     req: Request,
//     res: Response
//   ): Promise<Response> => {
//     try {
//       if (req.user._id != req.params.id) {
//         return res.status(400).json({
//           success: false,
//           message: "Not Permitted",
//         });
//       }
//       const payload = <UpdateUserData>req.body;
      
//       const {
//         userName,
//         firstName,
//         lastName,
//         phoneNo,
//         email,
//         isAdmin,
//         password,
//         gender,
//         state,
//         city,
//         address,
//         vehicles
        
//       } = payload;
//       let hashedPassword;
//       if (password) {
//         const salt = await bcrypt.genSalt(10);
//         hashedPassword = await bcrypt.hashSync(password, salt);
//       }
//       const user = await Users.findById(req.params.id);
//       if (user) {
//         user.userName = userName || user.userName;
//         user.firstName = firstName || user.firstName;
//         user.lastName = lastName || user.lastName;
//         user.phoneNo = phoneNo || user.phoneNo;
//         user.email = email || user.email;
//         user.password = hashedPassword || user.password;
//         user.gender = gender || user.gender;
//         user.state = state || user.state;
//         user.city = city || user.city;
//         user.address = address || user.address;
//         user.vehicles = vehicles || user.vehicles
//         user.isAdmin = isAdmin || user.isAdmin
  
//         const updatedUser = await user.save();
  
//         return res.json({ message: "User Updated", user: updatedUser });
//       } else {
//         return res.status(404).json({ message: "User Not Found" });
//       }
//     } catch (err: any) {
//       return res.status(500).json({
//         success: false,
//         message: err.message,
//       });
//     }
//   };