import { useState, useEffect } from 'react'
import { useJobsContext } from '../hooks/useJobsContext'
import { useAuthContext } from '../hooks/useAuthContext'


// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import JobFormModal from './JobFormModal'

const JobDetails = ({ job }) => {
  const { dispatch } = useJobsContext()
  const { user } = useAuthContext()
  const [isEditing, setIsEditing] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [fetchedJob, setFetchedJob] = useState(job);

  const handleEdit = () => {
    setFormSubmitted(false)
    setEditingJob(job);
    setIsEditing(!isEditing);
  };

  const handleFormClose = () => {
     // Change this state when the form is submitted or closed
    setIsEditing(false);
  };

  const fetchJobDetails = async (jobId) => {
    const response = await fetch(`/api/jobs/${jobId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    setFetchedJob(json); // Update the fetched job details
  };

  useEffect(() => {

    if (formSubmitted) {

      fetchJobDetails(fetchedJob._id); // Refetch the job details after form submission
    }
    
  }, [formSubmitted]);

  if(!user){
    return
  }
  const handleDelete = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/jobs/' + job._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_JOB', payload: json})
    }
  }

  
  return (
    <div className="job-details">

      <h4 style={{ marginBottom: '0.5rem' }}><strong></strong>{job.position}</h4>
      <p style={{ marginBottom: '0.5rem' }}><strong>Company: </strong>&nbsp; {job.company}</p>
      <p style={{ marginBottom: '0.5rem' }}><strong>Job Status: </strong>&nbsp; {job.jobStatus}</p>
      <p style={{ marginBottom: '0.5rem' }}><strong> Job Type: </strong>&nbsp; {job.jobType}</p>
      
      <p style={{ marginBottom: '0.5rem' }}><strong>Salary: </strong>&nbsp; {job.salary}</p>
      <p style={{ marginBottom: '0.5rem' }}>{formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined edit-button" onClick={handleEdit}>edit</span>
      <span className="material-symbols-outlined delete-button" onClick={handleDelete}>delete</span>

      {isEditing && (
        <JobFormModal isEditing={isEditing} editingJob={editingJob} setIsEditing={setIsEditing} handleFormClose={handleFormClose} setFormSubmitted={setFormSubmitted}/>
      )}
    </div>
  )
}

export default JobDetails