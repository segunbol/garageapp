import { Joi } from "./joi";

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
    age:Joi.number().allow("", null),
    bmi:Joi.number().allow("", null),
    image: Joi.string().allow("", null),
    images: Joi.string().allow("", null),
    password: Joi.string(),
    gender: Joi.string().required().trim().valid("Male", "Female"),
    isAdmin: Joi.boolean().allow("", null),
    verified: Joi.boolean().allow("", null),
    state: Joi.string().allow("", null),
    city: Joi.string().allow("", null),
    currentWeight: Joi.number().optional(),
    targetWeight: Joi.number().optional(),
    focusArea: Joi.string().allow("", null).valid(
      "back",
      "cardio",
      "chest",
      "lower arms",
      "lower legs",
      "neck",
      "shoulders",
      "upper arms",
      "upper legs",
      "waist",
      "full body"
    ),
    goals: Joi.string().allow("", null).valid("Keep fit", "Muscle gain", "Weight loss"),
    level: Joi.string().allow("", null).valid("beginner", "intermediate", "expert"),
    difficulty: Joi.string().allow("", null).valid("easy", "medium", "hard"),
    gymSubscribed: Joi.array().items(
      Joi.object({
        gymId: Joi.string().allow("", null),
        name: Joi.string().allow("", null),
      })
    ).allow(null),
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
    age:Joi.number().allow("", null),
    bmi:Joi.number().allow("", null),
    image: Joi.string().allow("", null),
    images: Joi.string().allow("", null),
    password: Joi.string().allow("", null),
    gender: Joi.string().allow("", null).trim().valid("Male", "Female"),
    state: Joi.string().allow("", null),
    city: Joi.string().allow("", null),
    currentWeight: Joi.number().optional(),
    targetWeight: Joi.number().optional(),
    focusArea: Joi.string().allow("", null).valid(
      "back",
      "cardio",
      "chest",
      "lower arms",
      "lower legs",
      "neck",
      "shoulders",
      "upper arms",
      "upper legs",
      "waist"
    ),
    goals: Joi.string().allow("", null).valid("Keep fit", "Muscle gain", "Weight loss"),
    level: Joi.string().allow("", null).valid("beginner", "intermediate", "expert"),
    difficulty: Joi.string().allow("", null).valid("easy", "medium", "hard"),
    gymSubscribed: Joi.array().items(
      Joi.object({
        gymId: Joi.string().allow("", null),
        name: Joi.string().allow("", null),
      })
    ).allow(null), 
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
