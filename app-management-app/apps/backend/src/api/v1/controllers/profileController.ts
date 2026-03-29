import { Request, Response, NextFunction } from "express";
import { successResponse, errorResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as profileService from "../services/profileService";

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as string;
    const user = await profileService.getProfileById(id);

    if (!user) {
      res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse("User profile not found."));
      return;
    }

    res.status(HTTP_STATUS.OK).json(successResponse(user, "User profile retrieved successfully."));

  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { name, email, phone, address } = req.body;

    if (!name || !email || !phone || !address) {
      res.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse("All fields are required."));
      return;
    }

    const updatedUser = await profileService.updateProfile(id, {
      name,
      email,
      phone,
      address
    });

    res.status(HTTP_STATUS.OK).json(successResponse(updatedUser, "User profile updated successfully."));

  } catch (error) {
    next(error);
  }
};

export const getAllProfiles = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await profileService.getAllProfiles();

    res.status(HTTP_STATUS.OK).json(successResponse(users, "User profiles retrieved successfully."));

  } catch (error) {
    next(error);
  }
};
