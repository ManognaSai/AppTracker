import { useEffect, useState, useMemo } from "react"
import { useJobsContext } from "../hooks/useJobsContext"
import { useAuthContext } from "../hooks/useAuthContext"
//import { usePagination } from "../hooks/usePagination"

// components
import JobDetails from "../components/JobDetails"
import JobForm from "../components/JobForm"
import JobFormModal from "../components/JobFormModal"
//import Pagination from '../components/Pagination';

//let PageSize = 10;

const Home = () => {
  
  const {jobs, dispatch} = useJobsContext()
  const user = useAuthContext()
  
  const token = user.user.token
  
  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch('/api/jobs', {
        headers: {'Authorization': `Bearer ${token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_JOBS', payload: json})
      }
    }

    if (user) {
      fetchJobs()
    }
  }, [dispatch, user, jobs])


  return (
    <div className="home">

      <JobFormModal></JobFormModal>
      <div className="jobs">
        {jobs && jobs.map(job => (
          <JobDetails job={job} key={job._id} />
        ))}
      </div>
    </div>
  )
}

export default Home