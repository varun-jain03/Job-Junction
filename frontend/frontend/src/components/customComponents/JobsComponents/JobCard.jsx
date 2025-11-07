import { Box, Stack, Flex, Image, Button, CloseButton, Drawer, Portal } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import companyLogo from '../../../assets/fontawesome/company-Logo.png';
import locationImg from '../../../assets/fontawesome/location-dot-solid-full.svg';
import moneyImg from '../../../assets/fontawesome/money-bills-solid-full.svg';

function JobCard({ job }) {
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkApplied = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const res = await fetch("https://job-junction-backend-91n3.onrender.com/application", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        // data.appliedJobs is an array of applications
        const appliedJobIds = data.appliedJobs.map(app => app.job._id);
        if (appliedJobIds.includes(job._id)) {
          setApplied(true);
        }
      } catch (err) {
        console.error("Error fetching applied jobs:", err);
      }
    };

    checkApplied();
  }, [job._id]);

  const handleApply = async (jobId) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("Please log in to apply for jobs.");
        return;
      }

      setLoading(true);

      const res = await fetch(`https://job-junction-backend-91n3.onrender.com/application/apply/${jobId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Apply request failed:", text);
        alert("Failed to apply. Check console for details.");
        return;
      }

      const data = await res.json();
      alert(data.msg);

      if (data.msg.toLowerCase().includes("successfully")) {
        setApplied(true);
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <Box className='job-card'>
      <Flex className='job-card-content-card' id='company-possition-info' >
        <Image rounded="md" src={companyLogo} alt="Company Logo" w='10' h='10' />
        <Box>
          <b>{job.title}</b>
          <p style={{ fontSize: "10px" }}>{job.company_name}</p>
        </Box>
      </Flex>

      <Stack className='job-card-content-card' id='lcoation-pay-info' >
        <Flex pl='20px' ><Image mt='5px' src={locationImg} alt="lcoation" w='20px' h='20px' /><p>{job.location}</p></Flex>
        <Flex pl='20px' mt='-15px'><Image mt='5px' src={moneyImg} alt="Pay" w='20px' h='20px' /><p>{job.salary}</p></Flex>
      </Stack>

      <Flex className='job-card-content-card' id='apply-details-BTN' gapX='10px' mt='4px' >
        {/* <Button bgColor='blue.400' h='36px' >APPLY NOW</Button> */}
        <Button
          bgColor={applied ? "green.400" : "blue.500"}
          color="white"
          _hover={{ bgColor: applied ? "green.500" : "blue.600" }}
          onClick={() => handleApply(job._id)}
          isDisabled={applied || loading}
        >
          {loading ? "Applying..." : applied ? "Applied" : "Apply"}
        </Button>
        <Drawer.Root>
          <Drawer.Trigger asChild>
            <Button size="sm" bg='blue.100' color='blue.900'>
              MORE DETAILS
            </Button>
          </Drawer.Trigger>
          <Portal>
            <Drawer.Backdrop />
            <Drawer.Positioner>
              <Drawer.Content bgColor='blue.100' >
                <Drawer.Header>
                  <Drawer.Title >{job.company_name}</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                  <b>position-   </b><p>{job.title}</p>
                  <hr />
                  <b>JOB DESCRIPTION-  </b><p>{job.description} </p>
                  <hr />
                  <b>REQUIRED SKILLS - </b>
                  <Box>
                    {job.requiredSkills.map((skill, index) => (
                      <p key={index}>{skill}</p>
                    ))}
                  </Box>
                  <hr />
                  <b>SALARY-  </b><p>{job.salary}</p>
                  <hr />
                  <b>EXPERIACE-  </b><p>{job.experience}</p>
                  <hr />
                  <b>LOCATION-  </b><p>{job.location}</p>
                  <hr />
                  <b>JOB TYPE-  </b><p>{job.jobType}</p>
                  <hr />
                  <b>OPENINGS-  </b><p>{job.openings}</p>



                </Drawer.Body>
                <Drawer.Footer>
                  {/* <Button bgColor='red.500' color='black' onClick={() => handleApply(job._id)} >Cancel</Button> */}
                  <Button
                    bgColor={applied ? "green.400" : "blue.500"}
                    color="white"
                    _hover={{ bgColor: applied ? "green.500" : "blue.600" }}
                    onClick={() => handleApply(job._id)}
                    isDisabled={applied || loading}
                  >
                    {loading ? "Applying..." : applied ? "Applied" : "Apply"}
                  </Button>
                  <Button bgColor='red.500' >Close</Button>
                </Drawer.Footer>
                <Drawer.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Drawer.CloseTrigger>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      </Flex>
    </Box>
  )
}

export default JobCard