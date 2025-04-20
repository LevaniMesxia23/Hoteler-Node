import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./auth";

export const roleMiddleware = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({
        message: "Forbidden",
      });
      return;
    }
    next();
  };
};
