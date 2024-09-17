import { Service } from "../models/service.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncMiddleware } from "../middlewares/asyncHandler.js";
import mongoose from "mongoose";

// Add a new service
export const addService = asyncMiddleware(async (req, res, next) => {
  try {
    const { name, description, image } = req.body;

    const newService = new Service({
      name,
      description,
      image,
    });

    await newService.save();
    res
      .status(201)
      .json(new ApiResponse(201, newService, "Service added successfully"));
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});

// Get all services
export const getServices = asyncMiddleware(async (req, res, next) => {
  try {
    const services = await Service.find();

    if (services.length === 0) {
      throw new ApiError(404, "No services found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, services, "Services retrieved successfully"));
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});

// Update the service by ID
export const updateService = asyncMiddleware(async (req, res, next) => {
  try {
    const { id } = req.params; // Get the ID from the URL parameters
    const { name, description, image } = req.body;

    // Ensure ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid ID format");
    }

    const updatedService = await Service.findByIdAndUpdate(
      id, // Find the document by ID
      { name, description, image },
      { new: true } // Return the updated document
    );

    if (!updatedService) {
      throw new ApiError(404, "Service not found");
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, updatedService, "Service updated successfully")
      );
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});

// Delete the service by id
export const deleteService = asyncMiddleware(async (req, res, next) => {
  try {
    const { id } = req.params; // Get the ID from the URL parameters

    // Ensure ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid ID format");
    }

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      throw new ApiError(404, "Service not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, null, "Service deleted successfully"));
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});
