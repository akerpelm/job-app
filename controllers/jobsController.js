import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { checkPermission } from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";

const createJob = async (req, res) => {
  const { position, company } = req.body;
  if (!position || !company) {
    throw new BadRequestError("Please provide all values");
  }
  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
const deleteJob = async (req, res) => {
  const {
    params: { id: jobId }
  } = req;

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }

  checkPermission(req.user, job.createdBy);

  await job.remove();
  res.status(StatusCodes.OK).json({ msg: "Job removed successfully." });
};
const getAllJobs = async (req, res) => {
  const { jobStatus, jobType, sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userId
  };

  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus;
  }

  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  if (search) {
    queryObject.position = { $regex: search, $options: "i" }; //case insensitive
    // queryObject.company = { $regex: search, $options: "i" }; //case insensitive
  }
  let result = Job.find(queryObject);

  if (sort === "newest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "position a-z") {
    result = result.sort("position");
  }
  if (sort === "position z-a") {
    result = result.sort("-position");
  }
  if (sort === "company a-z") {
    result = result.sort("company");
  }
  if (sort === "company z-a") {
    result = result.sort("-company");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  result = result.skip(offset).limit(limit);

  const jobs = await result;

  const totalJobs = await Job.countDocuments(queryObject);
  const pages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ jobs, totalJobs, pages });
};
const updateJob = async (req, res) => {
  const {
    params: { id: jobId },
    body: { company, position }
  } = req;

  if (!company || !position) {
    throw new BadRequestError("Please provide all values");
  }

  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id${jobId}`);
  }

  //check permissions

  checkPermission(req.user, job.createdBy);
  //check whole user object in case you want roles, etc. in future.

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true
  });

  res.status(StatusCodes.OK).json({ updatedJob });
};

const showStats = async (req, res) => {
  const jobStatusCount = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } }
  ]);

  const jobsGroupedByStatus = jobStatusCount.reduce((acc, curr) => {
    const { _id: jobStatus, count } = curr;
    acc[jobStatus] = count;
    return acc;
  }, {});

  const jobsByStatus = {
    applicationPending: jobsGroupedByStatus["Application Pending"] || 0,
    applicationSubmitted: jobsGroupedByStatus["Application Submitted"] || 0,
    phoneScreen: jobsGroupedByStatus["Phone Screen"] || 0,
    interview: jobsGroupedByStatus["Interview"] || 0,
    rejected: jobsGroupedByStatus["Rejected"] || 0,
    declined: jobsGroupedByStatus["Declined"] || 0,
    accepted: jobsGroupedByStatus["Accepted"] || 0
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt"
          },
          month: {
            $month: "$createdAt"
          }
          // week: {
          //   $week: "$createdAt"
          // }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { "_id.year": -1, "_id.month": -1, "_id.week": -1 } }
    // { $limit: 10 }
  ]);

  monthlyApplications = monthlyApplications
    .map(({ _id: { year, month }, count }) => {
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");

      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ jobsByStatus, monthlyApplications });
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
