import mongoose from "mongoose";
import { Faq } from "../models/faq.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncMiddleware } from "../middlewares/asyncHandler.js";

// Add a new FAQ
export const addFaq = asyncMiddleware(async (req, res, next) => {
  try {
    const { question, answer } = req.body;

    const newFaq = new Faq({
      question,
      answer,
    });

    await newFaq.save();
    res
      .status(201)
      .json(new ApiResponse(201, newFaq, "FAQ added successfully"));
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});

// Get all FAQs
export const getAllFaqs = asyncMiddleware(async (req, res, next) => {
  try {
    const faqs = await Faq.find();

    if (faqs.length === 0) {
      throw new ApiError(404, "No FAQs found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, faqs, "FAQs retrieved successfully"));
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});

// Delete an FAQ by ID
export const deleteFaq = asyncMiddleware(async (req, res, next) => {
  try {
    const { id } = req.params; // Get the ID from the URL parameters

    // Ensure ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid ID format");
    }

    const deletedFaq = await Faq.findByIdAndDelete(id);

    if (!deletedFaq) {
      throw new ApiError(404, "FAQ not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, null, "FAQ deleted successfully"));
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});
