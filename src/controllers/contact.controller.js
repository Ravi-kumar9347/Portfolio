import { Contact } from "../models/contact.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncMiddleware } from "../middlewares/asyncHandler.js";

// Add a new contact document
export const addContact = asyncMiddleware(async (req, res, next) => {
  try {
    const { name, email, message, phone, subject } = req.body;

    // Check if a contact document already exists
    const existingContact = await Contact.findOne();
    if (existingContact) {
      throw new ApiError(
        400,
        "Contact document already exists. Use update to modify."
      );
    }

    const newContact = new Contact({
      name,
      email,
      message,
      phone,
      subject,
    });

    await newContact.save();
    res
      .status(201)
      .json(
        new ApiResponse(201, newContact, "Contact document added successfully")
      );
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});

// Get the contact document
export const getContact = asyncMiddleware(async (req, res, next) => {
  try {
    const contact = await Contact.findOne();

    if (!contact) {
      throw new ApiError(404, "Contact document not found");
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, contact, "Contact document retrieved successfully")
      );
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});

// Update the contact document
export const updateContact = asyncMiddleware(async (req, res, next) => {
  try {
    const { name, email, message, phone, subject } = req.body;

    const updatedContact = await Contact.findOneAndUpdate(
      {}, // Find the single document
      { name, email, message, phone, subject },
      { new: true, upsert: true } // Return the updated document and create it if it doesn't exist
    );

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedContact,
          "Contact document updated successfully"
        )
      );
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});

// Delete the contact document
export const deleteContact = asyncMiddleware(async (req, res, next) => {
  try {
    const deletedContact = await Contact.findOneAndDelete();

    if (!deletedContact) {
      throw new ApiError(404, "Contact document not found");
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, null, "Contact document deleted successfully")
      );
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
});
