const express = require('express')
const {
  getJobs, 
  getJob, 
  createJob, 
  deleteJob, 
  updateJob
} = require('../controllers/jobController')

// require auth for all workout routes
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()
router.use(requireAuth)

// GET all jobs
router.get('/', getJobs)

// GET a single job
router.get('/:id', getJob)

// POST a new job
router.post('/', createJob)

// DELETE a job
router.delete('/:id', deleteJob)

// UPDATE a job
router.patch('/:id', updateJob)

module.exports = router