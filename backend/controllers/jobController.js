const Job = require('../models/jobModel')
const mongoose = require('mongoose')

// get all jobs
const getJobs = async (req, res) => {
  const user_id = req.user._id
  const jobs = await Job.find({user_id}).sort({createdAt: -1})

  res.status(200).json(jobs)
}

// get a single job 
const getJob = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such Job'})
  }

  const job = await Job.findById(id)

  if (!job) {
    return res.status(404).json({error: 'No such job'})
  }

  res.status(200).json(job)
}

// create a new job
const createJob = async (req, res) => {
  const { position, company, jobStatus, jobType, salary } = req.body;
  
  if (!position || !company) {
    throw new BadRequestError("Please provide position and company!");
  }

  if (jobStatus === "interview" && !interviewScheduledAt) {
    throw new BadRequestError("Please provide the interview date and time!");
  }

  // add to the database
  try {
    const user_id = req.user._id
    const job = await Job.create({ position, company, jobStatus, jobType, salary , user_id})
    console.log(job)
    res.status(200).json(job)
  } catch (error) {
    res.status(400).json({ error: "Please fill all the fields" })
  }
}

// delete a job
const deleteJob = async (req, res) => {

  const job = await Job.findOne({ _id: req.params.id });
  
  if(!job) {
    return res.status(400).json({error: 'No such job'})
  }
  await Job.findOneAndDelete({ _id: req.params.id });
  res.status(200).json(job)
}

// update a job
const updateJob = async (req, res) => {
  const { company, position, jobStatus, interviewScheduledAt } = req.body;

  
  if (!company || !position) {
    throw new BadRequestError("Please provide position and company!");
  }

  if (jobStatus === "interview" && !interviewScheduledAt) {
    throw new BadRequestError("Please provide the interview date and time!");
  }

  const job = await Job.findOneAndUpdate({ _id: req.params.id }, {
    ...req.body
  })
  
  if (!job) {
    throw new BadRequestError(`There's no job with the id: ${req.params.id}`);
  }

  res.status(200).json(job)
}

module.exports = {
  getJobs,
  getJob,
  createJob,
  deleteJob,
  updateJob
}