const mongoose = require("mongoose")

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    emailM: {
      type: String,
    },
    username: {
      type: String,
    },
    visitHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true }
)

const URL = mongoose.model("url", urlSchema)

module.exports = URL
