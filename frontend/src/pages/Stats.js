import React, { useContext, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useJobsContext } from '../hooks/useJobsContext'// Replace 'path-to-your-context-file' with the correct path

import { Bar } from "react-chartjs-2";
import { BarElement,  CategoryScale,Chart as ChartJS,Legend, LinearScale,Title, Tooltip } from "chart.js";

const Statistics = () => {
   
  const {jobs, dispatch} = useJobsContext()
  let ftAppliedCount = 0;
  let ftInProgressCount = 0;
  let ftOfferCount = 0;
  let ftDeclinedCount = 0;

  let internAppliedCount = 0;
  let internInProgressCount = 0;
  let internOfferCount = 0;
  let internDeclinedCount = 0;

  // Iterate through jobs to count different application statuses
  if (jobs) {
    jobs.forEach(job => {
    if(job.jobType === "Full-Time"){
        switch (job.jobStatus) {
            case 'Applied':
              ftAppliedCount++;
              break;
            case 'In-Progress':
              ftInProgressCount++;
              break;
            case 'Offer':
              ftOfferCount++;
              break;
            case 'Declined':
              ftDeclinedCount++;
              break;
            default:
              break;
        }
    }
    else{
        switch (job.jobStatus) {
            case 'Applied':
              internAppliedCount++;
              break;
            case 'In-Progress':
              internInProgressCount++;
              break;
            case 'Offer':
              internOfferCount++;
              break;
            case 'Declined':
              internDeclinedCount++;
              break;
            default:
              break;
        }
    }
      
    });
  }
    ChartJS.register(CategoryScale, LinearScale, BarElement,Title,Tooltip,Legend);
    const option = {
        responsive: true,
        plugins: {
          legend: { position: "chartArea" },
          title: {
            display: true,
            text: "",
          },
        },
        scales: {
            y: {
              beginAtZero: true,
              suggestedMin: 0, // Set the minimum value of the axis to 0
              suggestedMax: 10, // Set a maximum value as needed
              ticks: {
                stepSize: 1, // Step size of 1 to ensure only integers are displayed
              },
            },
          },
      };
      
      const data = {
        labels:["Applied", "In-Progress", "Offer", "Declined"],
        datasets: [
          {
            label: "Application Status - Full time",
            data: [ftAppliedCount,ftInProgressCount , ftOfferCount, ftDeclinedCount],
            backgroundColor: '#1aac83', 
          },
          {
            label:'Application Status - Internship',
            data:[internAppliedCount,internInProgressCount , internOfferCount, internDeclinedCount],
            backgroundColor:'blue'
          },
        ],
      
      };
    return (
        <div className="App">
          <Bar options={option} data={data} />
        </div>
      );
};

export default Statistics;