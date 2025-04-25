import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRATION } from "../config/env.js";

export const createToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
};
