import { useState, useEffect } from 'react'
import { useJobsContext } from '../hooks/useJobsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const JobForm = ({ job, edit, closeModal }) => {
  const { dispatch } = useJobsContext()
  const { user } = useAuthContext()

  const [position, setPosition] = useState(job?.position || '');
  const [company, setCompany] = useState(job?.company || '');
  const [jobStatus, setJobStatus] = useState(job?.jobStatus || 'Applied');
  const [jobType, setJobType] = useState(job?.jobType || 'Internship');
  const [salary, setSalary] = useState(job?.salary || '');

  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  /*useEffect(() => {
   
      setPosition(job.position || '');
      setCompany(job.company || '');
      setJobStatus(job.jobStatus || 'applied');
      setJobType(job.jobType || 'internship');
      setSalary(job.salary || '');
    
  }, [job]);*/

  const clearForm = () => {
    setPosition('');
    setCompany('');
    setJobStatus('');
    setJobType('');
    setSalary('');
    setEmptyFields([]);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!user){
      setError("You must be logged in")
      return 
    }
    const newJob = { position, company, jobStatus, jobType, salary }
    console.log(newJob.company)
    
    const token= user.token

    try {
      let response;
      if (!edit) {
        response = await fetch('/api/jobs', {
          method: 'POST',
          body: JSON.stringify(newJob),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
      } 
      if(edit) {
        
        const url = '/api/jobs/' + job._id;
        const newJob = { _id: job._id,  // Ensure the payload has the ID field for identification
        position,
        company,
        jobStatus,
        jobType,
        salary
      };
        
        response = await fetch(url, {
          method: 'PATCH',
          body: JSON.stringify(newJob),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
      }

      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      } else {
        console.log(edit ? 'Job edited' : 'New job added', json);
        dispatch({ type: edit ? 'UPDATE_JOB' : 'CREATE_JOB', payload: json });
        clearForm();
        closeModal();
      }
    } catch (error) {
      setError('An error occurred while processing your request');
      console.error(error);
    }
  }

  return (
    <div>
        <form className="create" onSubmit={handleSubmit}> 
        <h3>{edit ? 'Edit Job Application' : 'Add new Job Application'}</h3>
        <label >Position</label>
        <input 
          type="text" 
          onChange={(e) => setPosition(e.target.value)} 
          value={position}
        />

        <label>Company</label>
        <input 
          type="text" 
          onChange={(e) => setCompany(e.target.value)} 
          value={company}
        />
        <div>
          <label>Job Status</label>
            <select onChange={(e) => {
                  const selectedStatus = e.target.value;
                  setJobStatus(selectedStatus);
              }} value={jobStatus}>
              <option value="Applied"> Applied</option> 
              <option value="In-Progress"> In-Progress</option>
              <option value="Offer"> Offer</option>
              <option value="Declined"> Declined</option>
            </select>
        </div>

        <div>
          <label>Job Type</label>
          <select onChange={(e) => {
            const selectedType = e.target.value;
              setJobType(selectedType);
            }} value={jobType}>
            <option value="Internship">Internship</option>
            <option value="Full-Time">Full-Time</option>
          </select>
        </div>

        <label>Salary</label>
        <input 
        type="number" 
        onChange={(e) => setSalary(e.target.value)} 
        value={salary} 
        />

        {!edit && <button>Add Application</button>}
        {edit && <button>Edit Application</button>}
        {error && <div className="error">{error}</div>}
        </form>

    </div>
    
  );
};

export default JobForm