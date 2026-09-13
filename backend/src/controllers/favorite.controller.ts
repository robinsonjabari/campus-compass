import type { Request, Response } from "express";
import prisma from "../config/prisma.js";

export const getFavorites = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user?.userId;

  if (!userId) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const favorites = await prisma.favorite.findMany({
    where: {
      userId,
    },
    include: {
      building: true,
    },
  });

  res.status(200).json(favorites);
};

export const addFavorite = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user?.userId;
  const { buildingId } = req.body;

  if (!userId) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  if (!buildingId) {
    res.status(400).json({
      message: "Building ID is required",
    });
    return;
  }

  const building = await prisma.building.findUnique({
    where: {
      id: buildingId,
    },
  });

  if (!building) {
    res.status(404).json({
      message: "Building not found",
    });
    return;
  }

  const existingFavorite = await prisma.favorite.findFirst({
    where: {
      userId,
      buildingId,
    },
  });

  if (existingFavorite) {
    res.status(409).json({
      message: "Favorite already exists",
    });
    return;
  }

  const favorite = await prisma.favorite.create({
    data: {
      userId,
      buildingId,
    },
    include: {
      building: true,
    },
  });

  res.status(201).json(favorite);
};

export const removeFavorite = async (
  req: Request<{ buildingId: string }>,
  res: Response
): Promise<void> => {
  const userId = req.user?.userId;
  const { buildingId } = req.params;

  if (!userId) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  const favorite = await prisma.favorite.findFirst({
    where: {
      userId,
      buildingId,
    },
  });
  if (!favorite) {
    res.status(404).json({
      message: "Favorite not found",
    });
    return;
  }
  await prisma.favorite.delete({
    where: {
      id: favorite.id,
    },
  });
  res.status(200).json({
    message: "Favorite removed successfully",
  });
};
