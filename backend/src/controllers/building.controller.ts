import type { Request, Response } from "express";
import prisma from "../config/prisma.js";

export const getBuildings = async (
  req: Request,
  res: Response
): Promise<void> => {
  const buildings = await prisma.building.findMany();

  res.status(200).json(buildings);
};

export const getBuildingById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  const building = await prisma.building.findUnique({
    where: { id },
  });

  if (!building) {
    res.status(404).json({
      message: "Building not found",
    });
    return;
  }

  res.status(200).json(building);
};