import React from 'react';
import { Flex, Box, Avatar, Stack, Text, Image, Button, Heading, CloseButton, Drawer, Portal } from '@chakra-ui/react';
import userImage from '../assets/fontawesome/users-solid-full.svg';
import phoneImage from '../assets/fontawesome/phone-solid-full.svg';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Applied = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [status, setStatus] = useState("pending")

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const url = "https://job-junction-backend-91n3.onrender.com/application";

        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data && data.appliedJobs) {
          setAppliedJobs(data.appliedJobs);
          console.log("Applied Jobs:", data.appliedJobs);
        } else {
          console.log(data.msg || "No applied jobs found.");
        }
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      }
    };

    fetchAppliedJobs();
  }, [token]);

  return (
    <Flex
      className='home-container'
      mt='4rem'
      h='fit-content'
      maxW="80rem"
      gap='20px'
      ml="auto"
      mr="auto"
      pt='4rem'
      pb='4rem'
      borderRadius='100'
    >

      <Box className='applied-job-left-box'>
        <Stack className='applied-page-user-card' >
          <Avatar.Root h='80px' w='80px' >
            <Avatar.Fallback fontSize='2xl' name={user.name} />
            <Avatar.Image src="" />
          </Avatar.Root>
          <Text fontSize='24px' fontWeight='bold' >{user.name}</Text>
          <Text color='gray.500' mt='-15px' >{user.email}</Text>

          <Text color='gray.500' >bio- <b>{user.profile.bio}</b></Text>
          <Text color='gray.500' >skills- <b>{user.profile.skills}</b></Text>

          <Flex alignItems={'center'} justifyContent='space-between' mt='20px' >
            <Image src={userImage} w='15px' h='15px' /><Text color='gray.500' >{user.email}</Text>
          </Flex>
          <Flex alignItems={'center'} justifyContent='space-between' >
            <Image src={phoneImage} w='15px' h='15px' /><Text color='gray.500' >{user.phoneNumber}</Text>
          </Flex>

          <Button bg='green.500'><Link to='/profile' >Update Your Profile</Link></Button>
        </Stack>


      </Box>
      <Stack className='applied-job-right-box' >
        <Heading textAlign='center'>Applied Jobs -- Recruiter will contact you on call or email. <br />
          if you are short listed
        </Heading>
        {
          appliedJobs.map((job, index) => (
            <Box h='160px' w='90%' rounded='12px' bg='white' key={index} p='12px' >
              <Heading color='gray.700' fontWeight='bold' >{job.job.title}</Heading>
              <Flex>
                <Text color='gray.500' fontWeight='bold' >{job.job.company_name}</Text>
                <Text color='gray.400' ml='30px' >{job.job.location}</Text>
              </Flex>
              <Flex>
                <Text color='gray.500' fontWeight='bold' >status</Text>
                <Text color='gray.400' ml='30px' >{job.status}</Text>
              </Flex>
              <Flex justifyContent='space-between' >
                <Text color='gray.400' mt='20px' w='60%'>{job.job.description}</Text>
                <Drawer.Root>
                  <Drawer.Trigger asChild>
                    <Button size="sm" bg='green.500' color='blue.900'>
                      MORE DETAILS
                    </Button>
                  </Drawer.Trigger>
                  <Portal>
                    <Drawer.Backdrop />
                    <Drawer.Positioner>
                      <Drawer.Content bgColor='blue.100' >
                        <Drawer.Header>
                          <Drawer.Title >{job.job.company_name}</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                          <b>position-   </b><p>{job.job.title}</p>
                          <hr />
                          <b>JOB DESCRIPTION-  </b><p>{job.job.description} </p>
                          <hr />
                          <b>REQUIRED SKILLS - </b>
                          <Box>
                            {job.job.requiredSkills.map((skill, index) => (
                              <p key={index}>{skill}</p>
                            ))}
                          </Box>
                          <hr />
                          <b>SALARY-  </b><p>{job.job.salary}</p>
                          <hr />
                          <b>EXPERIACE-  </b><p>{job.job.experience}</p>
                          <hr />
                          <b>LOCATION-  </b><p>{job.job.location}</p>
                          <hr />
                          <b>JOB TYPE-  </b><p>{job.job.jobType}</p>
                          <hr />
                          <b>OPENINGS-  </b><p>{job.job.openings}</p>
                          <hr />
                          <b> STATUS-  </b><p>{job.status}</p>



                        </Drawer.Body>
                        <Drawer.CloseTrigger asChild>
                          <CloseButton size="sm" />
                        </Drawer.CloseTrigger>
                      </Drawer.Content>
                    </Drawer.Positioner>
                  </Portal>
                </Drawer.Root>
              </Flex>
            </Box>
          ))
        }
      </Stack>


    </Flex>
  )
}

export default Applied