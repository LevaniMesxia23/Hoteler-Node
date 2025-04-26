import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerSchema, loginSchema } from "../validator/auth";
import { comparePassword, hashPassword, createToken } from "../module/auth";
import { AuthenticatedRequest } from "../middleware/auth";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const result = registerSchema.safeParse(req.body);

  if (!process.env.JWT_SECRET) {
    res.status(500).json({
      message: "JWT_SECRET is not defined",
    });
    return;
  }

  if (!result.success) {
    res.status(400).json({
      message: "Invalid request body",
      errors: result.error.flatten().fieldErrors,
      formErrors: result.error.flatten().formErrors,
    });
    return;
  }

  const { name, email, password, role } = result.data;

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    res.status(400).json({
      message: "User already exists",
    });
    return;
  }

  const hashed = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role,
    },
  });

  const token = createToken(user.id, user.role, process.env.JWT_SECRET);

  res.status(201).json({
    message: "User created successfully",
    token,
  });
};

export const login = async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: "Invalid request body",
      errors: result.error.flatten().fieldErrors,
      formErrors: result.error.flatten().formErrors,
    });
    return;
  }

  const { email, password } = result.data;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    res.status(400).json({
      message: "Invalid email or password",
    });
    return;
  }

  const isValidUser = await comparePassword(password, user.password);

  if (!isValidUser) {
    res.status(400).json({
      message: "Invalid email or password",
    });
    return;
  }

  const token = createToken(user.id, user.role, process.env.JWT_SECRET);

  res.status(200).json({
    message: "Login successful",
    token,
  });
};

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;

    if(!user){
        res.status(401).json({
            message: "Unauthorized",
        })
        return;
    }

    const profile = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        }
    })

    res.status(200).json({
        message: "Profile fetched successfully",
        profile,
    })
}
