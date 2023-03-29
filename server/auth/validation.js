import Joi from "joi";

const email = Joi.string().email().min(8).lowercase().trim().required();
const name = Joi.string().min(3).max(20).trim().required();
const password = Joi.string().min(3).max(72, "utf8").trim().required();

export const registerSchema = Joi.object({
  email,
  name,
  password,
});

export const loginSchema = Joi.object({
  email,
  password,
});
