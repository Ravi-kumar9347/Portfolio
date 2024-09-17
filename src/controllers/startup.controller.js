import { Startup } from "../models/startup.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncMiddleware } from "../middlewares/asyncHandler.js";

// Add a new startup section
export const addStartup = asyncMiddleware(async (req, res, next) => {
  try {
    const { heading, description, location, image } = req.body;

    // Check if a startup section already exists
    const existingStartup = await Startup.findOne();
    if (existingStartup) {
      throw new ApiError(
        400,
        "Startup section already exists. Use update to modify."
      );
    }

    const newStartup = new Startup({
      heading,
      description,
      location,
      image,
    });

    await newStartup.save();
    res
      .status(201)
      .json(
        new ApiResponse(201, newStartup, "Startup section added successfully")
      );
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});

// Get the startup section
export const getStartup = asyncMiddleware(async (req, res, next) => {
  try {
    const startup = await Startup.findOne();

    if (!startup) {
      throw new ApiError(404, "Startup section not found");
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, startup, "Startup section retrieved successfully")
      );
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});

// Update the startup section
export const updateStartup = asyncMiddleware(async (req, res, next) => {
  try {
    const { heading, description, location, image } = req.body;

    const updatedStartup = await Startup.findOneAndUpdate(
      {}, // Find the single document
      { heading, description, location, image },
      { new: true, upsert: true } // Return the updated document and create it if it doesn't exist
    );

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedStartup,
          "Startup section updated successfully"
        )
      );
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});

// Delete the startup section
export const deleteStartup = asyncMiddleware(async (req, res, next) => {
  try {
    const deletedStartup = await Startup.findOneAndDelete();

    if (!deletedStartup) {
      throw new ApiError(404, "Startup section not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, null, "Startup section deleted successfully"));
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});
