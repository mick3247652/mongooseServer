import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  user: { type: String, required: true },
  message: { type: String, required: true },
  city: { type: String, required: true },
  time: { type: String, required: true },
  data: { type: String },
  likecount: { type: Number },
  to: { type: String },
});

export default mongoose.model("Message", MessageSchema);
