import mongoose from "mongoose";

const NotifySchema = new mongoose.Schema({
  nikname: { type: String },
  token: { type: String },
});

export default mongoose.model("Frend", NotifySchema);
