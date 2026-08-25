import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({
      message: "Authorization token is required",
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "Invalid authorization format",
    });
    return;
  }

   try {
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  );

  if (
    typeof decoded !== "object" ||
    !decoded.userId ||
    !decoded.campusId ||
    !decoded.role
  ) {
    res.status(401).json({
      message: "Invalid token payload",
    });
    return;
  }

  req.user = {
    userId: decoded.userId,
    campusId: decoded.campusId,
    role: decoded.role,
  };

  next();
} catch {
  res.status(401).json({
    message: "Invalid or expired token",
  });
}
};
