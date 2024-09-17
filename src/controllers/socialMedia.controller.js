import mongoose from "mongoose";
import { SocialMedia } from "../models/socialMedia.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncMiddleware } from "../middlewares/asyncHandler.js";

// Add a new social media entry
export const addSocialMedia = asyncMiddleware(async (req, res, next) => {
  try {
    const { platform, link } = req.body;

    const newSocialMedia = new SocialMedia({
      platform,
      link,
    });

    await newSocialMedia.save();
    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          newSocialMedia,
          "Social media entry added successfully"
        )
      );
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});

// Get all social media entries
export const getAllSocialMedia = asyncMiddleware(async (req, res, next) => {
  try {
    const socialMediaEntries = await SocialMedia.find();

    if (socialMediaEntries.length === 0) {
      throw new ApiError(404, "No social media entries found");
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          socialMediaEntries,
          "Social media entries retrieved successfully"
        )
      );
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});

// Update a social media entry by ID
export const updateSocialMedia = asyncMiddleware(async (req, res, next) => {
  try {
    const { id } = req.params; // Get the ID from the URL parameters
    const { platform, link } = req.body;

    // Ensure ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid ID format");
    }

    const updatedSocialMedia = await SocialMedia.findByIdAndUpdate(
      id,
      { platform, link },
      { new: true }
    );

    if (!updatedSocialMedia) {
      throw new ApiError(404, "Social media entry not found");
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedSocialMedia,
          "Social media entry updated successfully"
        )
      );
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});

// Delete a social media entry by ID
export const deleteSocialMedia = asyncMiddleware(async (req, res, next) => {
  try {
    const { id } = req.params; // Get the ID from the URL parameters

    // Ensure ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid ID format");
    }

    const deletedSocialMedia = await SocialMedia.findByIdAndDelete(id);

    if (!deletedSocialMedia) {
      throw new ApiError(404, "Social media entry not found");
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, null, "Social media entry deleted successfully")
      );
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});
