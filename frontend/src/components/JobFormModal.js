import { React, useState, useEffect } from 'react';
import JobForm from './JobForm'; 
import { Link } from 'react-router-dom'

const JobFormModal = ( {isEditing, editingJob, setIsEditing, handleFormClose, setFormSubmitted} ) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(isEditing);
  }, [isEditing]);

  const openModal = (job) => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    handleFormClose();
    setFormSubmitted(true);
  };
  return (
    <div className='modal-container'>
      <div className="button-container">
          {!isModalOpen && !isEditing && (
            <button onClick={() => openModal(null)} className="open-form-button">
              + New application
            </button>
            
          
          )}
          {!isModalOpen && !isEditing && 
            
            <Link to="/stats" className="stats-button">
                <button  className="stats-button">Show Analysis</button>
            </Link>
            
          }
      </div>
      
      
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <JobForm job={editingJob} edit={isEditing} closeModal={closeModal }/>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobFormModal;