import { Joi } from "./joi";
import { GenderEnum } from "../types";

export const userSignUpSchema = {
  body: Joi.object({
    userName: Joi.string()
      .required()
      .trim()
      .pattern(new RegExp("^[a-zA-Z\\s]*$"))
      .message("User name is required and accepts alphabets and spaces only."),
    firstName: Joi.string()
      .required()
      .trim()
      .pattern(new RegExp("^[a-zA-Z\\s]*$"))
      .message("first name is required and accepts alphabets and spaces only."),
    lastName: Joi.string()
      .required()
      .trim()
      .pattern(new RegExp("^[a-zA-Z\\s]*$"))
      .message("last name is required and accepts alphabets and spaces only."),
    phoneNo: Joi.string()
      .required()
      .length(11)
      .trim()
      .message('number should be in the "+2348012345678" format'),
    email: Joi.string().email().required().trim(),
    password: Joi.string(),
    gender: Joi.string().required().trim().valid(...Object.values(GenderEnum)),
    isAdmin: Joi.boolean().allow("", null),
    verified: Joi.boolean().allow("", null),
    state: Joi.string().allow("", null),
    city: Joi.string().allow("", null),
    address: Joi.string().allow("", null),
    vehicles: Joi.string().allow("", null)
    
  })
};

export const userSignInSchema = {
  body: Joi.object({
    userName: Joi.string()
      .required()
      .trim()
      .pattern(new RegExp("^[a-zA-Z\\s]*$"))
      .message("User name is required and accepts alphabets and spaces only."),
    password: Joi.string(),
  }),
};

export const editUserSchema = {
  body: Joi.object({
    userName: Joi.string()
      .allow("", null)
      .trim()
      .pattern(new RegExp("^[a-zA-Z\\s]*$"))
      .message("User name is required and accepts alphabets and spaces only."),
    firstName: Joi.string()
      .allow("", null)
      .trim()
      .pattern(new RegExp("^[a-zA-Z\\s]*$"))
      .message("first name is required and accepts alphabets and spaces only."),
    lastName: Joi.string()
      .allow("", null)
      .trim()
      .pattern(new RegExp("^[a-zA-Z\\s]*$"))
      .message("last name is required and accepts alphabets and spaces only."),
    phoneNo: Joi.string()
      .allow("", null)
      .length(11)
      .trim()
      .message('number should be in the "+2348012345678" format'),
    email: Joi.string().email().allow("", null).trim(),
    password: Joi.string().allow("", null),
    gender: Joi.string().allow("", null).trim().valid(...Object.values(GenderEnum)),
    state: Joi.string().allow("", null),
    city: Joi.string().allow("", null),
   
  }),
};

export const updateUserStatusSchema = {
  body: Joi.object({
    userName: Joi.string()
      .allow("", null)
      .trim()
      .pattern(new RegExp("^[a-zA-Z\\s]*$"))
      .message("User name is required and accepts alphabets and spaces only."),
    email: Joi.string().email().allow("", null).trim(),
    isAdmin: Joi.boolean().allow("", null),
    verified: Joi.boolean().allow("", null),
  }),
};
