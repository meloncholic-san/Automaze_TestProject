import mongoose from "mongoose";
import { CategoryEnum } from "../../utils/categoryEnum.js";
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: Number,
      min: 1,
      max: 10,
      default: 5,
    },
    category: {
      type: String,
      enum: Object.values(CategoryEnum),
      required: false,
    },
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);
