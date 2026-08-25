import type { Request, Response } from "express";
import prisma from "../config/prisma.js";

// Retrieve all buildings stored in the database.
export const getBuildings = async (
  req: Request,
  res: Response
): Promise<void> => {
  const buildings = await prisma.building.findMany();

  // Return the buildings as JSON with a successful response.
  res.status(200).json(buildings);
};

// Retrieve a single building using the ID provided in the URL.
export const getBuildingById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  // Extract the building ID from the route parameter.
  const { id } = req.params;

  // Search for the unique building that matches the provided ID.
  const building = await prisma.building.findUnique({
    where: { id },
  });

  // Return 404 response if no building exists with that ID.
  if (!building) {
    res.status(404).json({
      message: "Building not found",
    });
    return;
  }

  // Return the requested building if it was found.
  res.status(200).json(building);
};