import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  image: {
    type: String, 
  },
  projectDomain: {
    type: String,
  },
  feedback: {
    type: String,
    required: true,
  },
});

export const Testimonial = mongoose.model("Testimonial", testimonialSchema);
