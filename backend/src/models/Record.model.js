import mongoose from "mongoose";

const RecordSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount can't be Negative"],
    },
    type: {
      type: String,
      enum: ["INCOME", "EXPENSE"],
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    description: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);


RecordSchema.index({ type: 1, date: -1 });
RecordSchema.index({ createdBy: 1 });

const Record = mongoose.model("Record", RecordSchema);
export default Record;