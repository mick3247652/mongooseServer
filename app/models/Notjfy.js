import mongoose from "mongoose";

const NotifySchema = new mongoose.Schema({
  nickname: { type: String },
  token: { type: String },
});

export default mongoose.model("Notify", NotifySchema);
