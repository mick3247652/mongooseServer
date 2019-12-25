import mongoose from "mongoose";

const FrendSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
});

export default mongoose.model("Frend", FrendSchema);
