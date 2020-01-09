import mongoose from "mongoose";

const MuteSchema = new mongoose.Schema({
  user: { type: String },
  to: { type: String }
});

export default mongoose.model("Mute", MuteSchema);
