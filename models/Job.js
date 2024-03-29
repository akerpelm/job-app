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
    jobStatus: {
      // TODO: Update enum values and all calls to ensure styling.
      type: String,
      enum: [
        "Application Pending",
        "Application Submitted",
        "Phone Screen",
        "Interview",
        "Rejected",
        "Declined",
        "Accepted",
      ],
      default: "Application Pending",
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
