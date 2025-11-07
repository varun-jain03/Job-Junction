import { Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import JobCard from './JobCard.jsx';

const AllJobs = ({ selectedFilters }) => {
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    fetch("https://job-junction-backend-91n3.onrender.com/job", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then((data) => {
        setJobs(Array.isArray(data.jobs) ? data.jobs : [])
      })
      .catch(error => console.log(error))
  }, [])

  const filteredJobs = jobs.filter((job) => {
    const matchLocation =
      selectedFilters.FilterByLocation.length === 0 ||
      selectedFilters.FilterByLocation.includes(job.location?.toLowerCase());

    const matchExperience =
      selectedFilters.FilterByExperience.length === 0 ||
      selectedFilters.FilterByExperience.includes(job.experience?.toLowerCase());

    const matchType =
      selectedFilters.FilterByType.length === 0 ||
      selectedFilters.FilterByType.includes(job.jobType?.toLowerCase());

    return matchLocation && matchExperience && matchType;
  });


  return (
    <Stack
      w='650px'
      h='fit-content'
      pt='25px'
      pb='25px'
      borderRadius='2xl'
      bg="whitesmoke"
      alignItems='center'
    >
      {filteredJobs.length > 0 ? (
        filteredJobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))
      ) : (
        <p>No matching jobs found</p>
      )}
    </Stack>
  )
}

export default AllJobs