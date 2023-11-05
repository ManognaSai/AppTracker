const mongoose = require('mongoose')

const Schema = mongoose.Schema

const jobSchema = new Schema(
  {
    position: {
      type: String,
      required: [true, "Please specify the job position"],
      maxLength: [100, "Position cannot be bigger that 30 symbols"],
      trim: true,
    },
    company: {
      type: String,
      required: [true, "Please specify the company"],
      maxLength: [50, "Position cannot be bigger that 30 symbols"],
      trim: true,
    },
    jobStatus: {
      type: String,
      enum: ["Applied", "In-Progress", "Offer", "Declined"],
      default: "Applied",
    },
    jobType: {
      type: String,
      enum: ["Internship", "Full-Time"],
      default: "Full-Time",
    },
    recruiter: {
      type: String,
      maxLength: [30, "The recruiter's name cannot be bigger that 30 symbols"],
      trim: true,
    },
    recruiterEmail: {
      type: String,
      trim: true,
    },
    
    salary: {
      type: Number,
      min: 0,
    },
    interviewScheduledAt: {
      type: Date,
      min: Date.now(),
    },
    user_id:{
      type: String,
      required: true
    }
    /*createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "UserModel",
      required: [true, "Please provide the user associated with this job"],
    },*/
    
  },
  { timestamps: true } // provides "createdAt" and "updatedAt" fields automatically
);

module.exports = mongoose.model('Job', jobSchema)
