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
    // Which button the user tapped under "Queries"
    queryType: {
      type: String,
      enum: [
        "general",       // Share your query
        "not_received",  // Product not received
        "damaged",       // Product damaged
        "missed",        // Product missed
        "others",
      ],
      required: true,
    },
    // Form fields collected from the customer
    platformPurchased: { type: String, trim: true, default: "" },
    orderedDate: { type: String, trim: true, default: "" },
    product: { type: String, trim: true, default: "" },
    rate: { type: String, trim: true, default: "" }, // price/quantity as noted by the customer
    contactNumber: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" }, // free-text used for "others"/"share your query"
    status: {
      type: String,
      enum: ["new", "in_progress", "resolved"],
      default: "new",
    },
    attachmentUrl: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Query", QuerySchema);
