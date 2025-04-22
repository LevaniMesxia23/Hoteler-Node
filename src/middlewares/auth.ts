import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../module/auth";
import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export interface AuthenticatedRequest extends Request {
  user: User;
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.header("authorization");

  if (!bearer) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    if (!process.env.JWT_SECRET) {
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    const decoded = verifyToken(token, process.env.JWT_SECRET);

    req.user = decoded as User;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};