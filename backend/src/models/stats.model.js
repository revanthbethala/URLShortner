import mongoose from "mongoose";

const statsSchema = mongoose.Schema({
  url: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Url",
    required: true,
  },
  clicks: { type: Number, default: 0 },
  location: { type: String, default: "unknown" },
});

const Stats = mongoose.model("Stats", statsSchema);

export default Stats;
