import joi from "joi/lib";
import ApiError from "../utils/ApiError";

/* eslint-disable newline-per-chained-call */
const signupSchema = joi.object({
  firstname: joi
    .string()
    .min(3)
    .max(15)
    .trim()
    .lowercase()
    .required()
    .messages({
      "any.required": "First name is required",
      "string.empty": "First name cannot be empty",
      "string.min": "First name should be 3 characters long atleast",
      "string.max": "First name cannot be longer than 15 characters",
      "string.base": "First name can only be text",
    }),
  lastname: joi.string().min(3).max(15).trim().lowercase().required().messages({
    "any.required": "Last name is required",
    "string.empty": "Last name cannot be empty",
    "string.min": "Last name should be 3 characters long atleast",
    "string.max": "Last name cannot be longer than 15 characters",
    "string.base": "Last name can only be text",
  }),
  email: joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.empty": "Email cannot be empty",
    "string.email": "Invalid email",
    "string.base": "Email can only be text",
  }),
  password: joi.string().min(8).max(30).required().messages({
    "any.required": "Password is required",
    "string.empty": "Password cannot be empty",
    "string.min": "Password should be 8 characters long atleast",
    "string.max": "Password cannot be longer than 30 characters",
    "string.base": "Password can only be text",
  }),
  confirm_password: joi.valid(joi.ref("password")).messages({
    "any.only": "Passwords do not match",
    "any.required": "Confirm your password please",
  }),
});

const signupValidator = (data) => {
  const { error } = signupSchema.validate(data);
  if (error) {
    throw new ApiError(error.message, 400);
  }
};

export default signupValidator;
