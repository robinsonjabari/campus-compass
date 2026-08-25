import type { Request, Response } from "express";
import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { firstName, lastName, email, password } = req.body;

  // Validate all required information was provided
  if (!firstName || !lastName || !email || !password) {
    res.status(400).json({
      message: "First name, last name, email, and password are required",
    });
    return;
  }

  // Normalize the email to prevent casing or extra spaces from creating duplicates
  const normalizedEmail = email.trim().toLowerCase();

  // Validate no existing user with the same email exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (existingUser) {
    res.status(409).json({
      message: "An account with this email already exists",
    });
    return;
  }

  // Extract the university domain from the email
  const emailDomain = normalizedEmail.split("@")[1];

  if (!emailDomain) {
    res.status(400).json({
      message: "Invalid email format",
    });
    return;
  }

  // Find the campus that owns this email domain
  const campus = await prisma.campus.findUnique({
    where: {
      emailDomain,
    },
  });

  // Only allow registration for universities supported by Campus Compass
  if (!campus) {
    res.status(403).json({
      message: "This university is not supported by Campus Compass",
    });
    return;
  }

  // Hash the password before storing it
  const passwordHash = await bcrypt.hash(password, 10);

  // Create the user and associate them with the matched campus
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email: normalizedEmail,
      passwordHash,
      campusId: campus.id,
    },
  });

  // Return safe user information without exposing the password hash
  res.status(201).json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    campusId: user.campusId,
    role: user.role,
    emailVerified: user.emailVerified,
  });
};

export const loginUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  // Validate login credentials were provided
  if (!email || !password) {
    res.status(400).json({
      message: "Email and password are required",
    });
    return;
  }

  // Normalize the email so login matches how emails are stored
  const normalizedEmail = email.trim().toLowerCase();

  // Find the user by their unique email address
  const user = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  // Do not continue if the account does not exist
  if (!user) {
    res.status(401).json({
      message: "Invalid email or password",
    });
    return;
  }
    // Compare the submitted password with the stored password hash
  const passwordMatches = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!passwordMatches) {
    res.status(401).json({
      message: "Invalid email or password",
    });
    return;
  }

  // Create a signed JWT so the user can authenticate future requests
  const token = jwt.sign(
    {
      userId: user.id,
      campusId: user.campusId,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );

  // Return the token and safe user information
  res.status(200).json({
    token,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      campusId: user.campusId,
      role: user.role,
      emailVerified: user.emailVerified,
    },
  });
};