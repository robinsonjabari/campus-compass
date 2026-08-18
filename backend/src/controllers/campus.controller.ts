import { Request, Response } from "express";
import prisma from "../config/prisma.js";

export const getCampuses = async (
  req: Request,
  res: Response
): Promise<void> => {
  const campuses = await prisma.campus.findMany();

  res.status(200).json(campuses);
};