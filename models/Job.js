import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide a company name."],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide a position."],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: [
        "Application In Progress",
        "Applied",
        "Phone Screen",
        "Interview",
        "Rejected",
        "Declined",
        "Accepted",
      ],
      default: "Application In Progress",
    },
    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Contract", "Per Diem", "Internship"],
      default: "Full-Time",
    },
    jobLocation: {
      type: String,
      default: "The City",
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user."],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
