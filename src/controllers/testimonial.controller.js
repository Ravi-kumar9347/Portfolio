import { Testimonial } from "../models/testimonial.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncMiddleware } from "../middlewares/asyncHandler.js";
import mongoose from "mongoose";

// Add a new testimonial
export const addTestimonial = asyncMiddleware(async (req, res, next) => {
  try {
    const { clientName, image, projectDomain, feedback } = req.body;

    const newTestimonial = new Testimonial({
      clientName,
      image,
      projectDomain,
      feedback,
    });

    await newTestimonial.save();
    res
      .status(201)
      .json(
        new ApiResponse(201, newTestimonial, "Testimonial added successfully")
      );
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});

// Get all testimonials
export const getAllTestimonials = asyncMiddleware(async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find();

    if (testimonials.length === 0) {
      throw new ApiError(404, "No testimonials found");
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          testimonials,
          "Testimonials retrieved successfully"
        )
      );
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});

// Update a testimonial by ID
export const updateTestimonial = asyncMiddleware(async (req, res, next) => {
  try {
    const { id } = req.params; // Get the ID from the URL parameters
    const { clientName, image, projectDomain, feedback } = req.body;

    // Ensure ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid ID format");
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id, // Find the document by ID
      { clientName, image, projectDomain, feedback },
      { new: true } // Return the updated document
    );

    if (!updatedTestimonial) {
      throw new ApiError(404, "Testimonial not found");
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedTestimonial,
          "Testimonial updated successfully"
        )
      );
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});

// Delete a testimonial by ID
export const deleteTestimonial = asyncMiddleware(async (req, res, next) => {
  try {
    const { id } = req.params; // Get the ID from the URL parameters

    // Ensure ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid ID format");
    }

    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      throw new ApiError(404, "Testimonial not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, null, "Testimonial deleted successfully"));
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});
