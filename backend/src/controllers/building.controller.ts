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

// Create a new building for the authenticated admin's campus.
export const createBuilding = async (
  req: Request,
  res: Response
): Promise<void> => {
  const campusId = req.user?.campusId;

  const {
    name,
    category,
    description,
    latitude,
    longitude,
  } = req.body;

  // Ensure the authenticated user has a campus.
  if (!campusId) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  // Validate the required building fields.
  if (
    !name ||
    !category ||
    latitude === undefined ||
    longitude === undefined
  ) {
    res.status(400).json({
      message: "Name, category, latitude, and longitude are required",
    });
    return;
  }

  // Create the building under the authenticated admin's campus.
  const building = await prisma.building.create({
    data: {
      name,
      category,
      description,
      latitude,
      longitude,
      campusId,
    },
  });

  // Return the newly created building.
  res.status(201).json(building);
};

export const updateBuilding = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const campusId = req.user?.campusId;
  const { id } = req.params;

  // Ensure the authenticated admin has a campus.
  if (!campusId) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  
  // Find the building being requested.
  const building = await prisma.building.findUnique({
    where: {
      id,
    },
  });

  // Return 404 if the building does not exist.
  if (!building) {
    res.status(404).json({
      message: "Building not found",
    });
    return;
  }

  // Prevent admins from managing buildings from another campus.
  if (building.campusId !== campusId) {
    res.status(403).json({
      message: "You cannot manage buildings from another campus",
    });
    return;
  }
  // Extract the building fields that are allowed to be updated.
  const {
    name,
    category,
    description,
    latitude,
    longitude,
  } = req.body;

  // Update the building with the provided fields.
  const updatedBuilding = await prisma.building.update({
    where: {
      id,
    },
    data: {
      name,
      category,
      description,
      latitude,
      longitude,
    },
  });

  // Return the updated building.
  res.status(200).json(updatedBuilding);
};

// Delete a building belonging to the authenticated admin's campus.
export const deleteBuilding = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const campusId = req.user?.campusId;
  const { id } = req.params;

  // Ensure the authenticated admin has a campus.
  if (!campusId) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  // Find the building being requested.
  const building = await prisma.building.findUnique({
    where: {
      id,
    },
  });

  // Return 404 if the building does not exist.
  if (!building) {
    res.status(404).json({
      message: "Building not found",
    });
    return;
  }

  // Prevent admins from managing buildings from another campus.
  if (building.campusId !== campusId) {
    res.status(403).json({
      message: "You cannot manage buildings from another campus",
    });
    return;
  }

  // Delete the building.
  await prisma.building.delete({
    where: {
      id,
    },
  });

  // Return a success message.
  res.status(200).json({
    message: "Building deleted successfully",
  });
};