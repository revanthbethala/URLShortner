import mongoose from "mongoose";

const urlSchema = mongoose.Schema({
  longUrl: { type: String, required: true },
  shortUrl: { type: String, required: true },
  shortCode: String,
  validity: { type: Number, default: Date.now() + 30 * 60 * 1000 },
});

const Url = mongoose.model("Url", urlSchema);

export default Url;
