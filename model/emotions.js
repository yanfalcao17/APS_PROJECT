const mongoose = require("mongoose");

const emotionSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    emotion: { 
      type: String, 
      required: true 
    },
    note: { 
      type: String, 
      default: "" 
    }
  },
  {
    timestamps: true,
  }
);

// Compile to form the model
module.exports = mongoose.model("Emotion", emotionSchema);
