import mongoose from "mongoose";

const startupSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  image: {
    type: String,
  },
});

export const Startup = mongoose.model("Startup", startupSchema);
