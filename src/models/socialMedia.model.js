import mongoose from "mongoose";

const socialMediaSchema = new mongoose.Schema({
  platform: {
    type: String, // e.g., 'LinkedIn', 'Instagram', 'Twitter', 'Facebook'
    required: true,
  },
  link: {
    type: String, // URL for the social media profile
    required: true,
  },
});

export const SocialMedia = mongoose.model("SocialMedia", socialMediaSchema);
