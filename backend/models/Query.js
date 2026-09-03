const mongoose = require("mongoose");

const QuerySchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    language: {
      type: String,
      enum: ["english", "tamil"],
      default: "english",
    },
    // Form fields collected from the customer (Query flow)
    name: { type: String, trim: true, required: true },
    contactNumber: { type: String, trim: true, required: true },
    description: { type: String, trim: true, default: "" }, // "Problem"
    status: {
      type: String,
      enum: ["new", "in_progress", "resolved"],
      default: "new",
    },
    attachmentUrl: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Query", QuerySchema);