import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
  message: { type: String },
  nickname: { type: String }
});

export default mongoose.model("Like", LikeSchema);
