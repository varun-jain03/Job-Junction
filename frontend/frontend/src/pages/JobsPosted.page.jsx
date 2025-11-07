import {
  Flex,
  Box,
  Avatar,
  Stack,
  Text,
  Image,
  Button,
  Heading,
  CloseButton,
  Drawer,
  Portal,
  Input,
  Textarea,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import userImage from "../assets/fontawesome/users-solid-full.svg";
import phoneImage from "../assets/fontawesome/phone-solid-full.svg";
import { Link } from "react-router-dom";

const JobsPosted = () => {
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user"));

  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    requiredSkills: "",
    salary: "",
    experience: "",
    location: "",
    jobType: "full-time",
    openings: "",
    company_details: user.profile.company_details, 
    company_name: user.profile.company_name,
    userId: user._id
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        if (!token) {
          console.log("No token found");
          return;
        }

        const response = await fetch("https://job-junction-backend-91n3.onrender.com/job/recruiter/job", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok && data.jobs) {
          setJobs(data.jobs);
        } else {
          console.log("Failed to fetch jobs:", data.msg);
        }
      } catch (error) {
        console.error("Error fetching recruiter jobs:", error);
      }
    };

    fetchJobs();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobPayload = {
      title: newJob.title,
      description: newJob.description,
      requiredSkills: newJob.requiredSkills
        ? newJob.requiredSkills.split(",").map((skill) => skill.trim())
        : [],
      salary: newJob.salary,
      experience: newJob.experience,
      location: newJob.location,
      jobType: newJob.jobType,
      openings: newJob.openings,
      company_details: user.profile.company_details,
      company_name: user.profile.company_name,
      userId: user?._id,
    };

    try {
      const response = await fetch("https://job-junction-backend-91n3.onrender.com/job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobPayload),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ New job posted successfully!");
        setJobs((prev) => [...prev, data.newJob]);
        setNewJob({
          title: "",
          description: "",
          requiredSkills: "",
          salary: "",
          experience: "",
          location: "",
          jobType: "full-time",
          openings: "",
          company_details: user?.profile?.company,
          company_name: "",
        });
      } else {
        alert(data.msg || "❌ Failed to post job");
        console.log("Server Response:", data);
      }
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <Flex
      className="home-container"
      mt="4rem"
      h="fit-content"
      maxW="80rem"
      gap="20px"
      ml="auto"
      mr="auto"
      pt="4rem"
      pb="4rem"
      justifyContent="center"
    >
      {/* LEFT SIDE — Recruiter Info & Create Job */}
      <Box className="created-job-left-box">
        {/* Recruiter Profile Card */}
        <Stack className="created-page-user-card">
          <Avatar.Root h="80px" w="80px">
            <Avatar.Fallback fontSize="2xl" name={user?.name} />
          </Avatar.Root>

          <Text fontSize="24px" fontWeight="bold">
            {user?.name}
          </Text>
          <Text color="gray.500" mt="-15px">
            {user?.email}
          </Text>

          <Text color="gray.500">
            bio- <b>{user?.profile?.bio}</b>
          </Text>
          <Text color="gray.500">
            skills- <b>{user?.profile?.skills}</b>
          </Text>

          <Flex alignItems="center" justifyContent="space-between" mt="20px">
            <Image src={userImage} w="15px" h="15px" />
            <Text color="gray.500">{user?.email}</Text>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">
            <Image src={phoneImage} w="15px" h="15px" />
            <Text color="gray.500">{user?.phoneNumber}</Text>
          </Flex>

          <Button bg="green.500">
            <Link to="/profile">Update Your Profile</Link>
          </Button>
        </Stack>

        {/* Create Job Form */}
        <Stack className="created-page-createNewJob-card" mt={8}>
          <Heading fontSize="20px" color="gray.700" mb="10px">
            Post a New Job
          </Heading>

          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Job Title"
              name="title"
              value={newJob.title}
              onChange={handleChange}
              mb="10px"
              required
            />
            <Textarea
              placeholder="Job Description"
              name="description"
              value={newJob.description}
              onChange={handleChange}
              mb="8px"
              required
            />
            <Input
              placeholder="Required Skills (comma separated)"
              name="requiredSkills"
              value={newJob.requiredSkills}
              onChange={handleChange}
              mb="10px"
            />
            <Input
              placeholder="Salary"
              name="salary"
              value={newJob.salary}
              onChange={handleChange}
              mb="10px"
              required
            />
            <Input
              placeholder="Experience"
              name="experience"
              value={newJob.experience}
              onChange={handleChange}
              mb="10px"
              required
            />
            <Input
              placeholder="Location"
              name="location"
              value={newJob.location}
              onChange={handleChange}
              mb="10px"
              required
            />

            <select
              className="job-type-select"
              name="jobType"
              value={newJob.jobType}
              onChange={handleChange}
              required
            >
              <option value="">Select Job Type</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
            </select>

            <Input
              placeholder="Openings"
              name="openings"
              value={newJob.openings}
              onChange={handleChange}
              mb="10px"
              required
            />

            <Button type="submit" bg="green.500" color="white" w="100%">
              Create Job
            </Button>
          </form>
        </Stack>
      </Box>

      {/* RIGHT SIDE — Job Listings */}
      <Stack className="created-job-right-box">
        <Heading textAlign="center" fontSize="24px">
          Jobs Posted By You
        </Heading>

        {jobs.map((job, index) => (
          <Box
            h="fit-content"
            w="90%"
            rounded="12px"
            bg="white"
            key={index}
            p="12px"
          >
            <Heading color="gray.700" fontWeight="bold">
              {job.title}
            </Heading>
            <Flex>
              <Text color="gray.500" fontWeight="bold">
                {job.company_name}
              </Text>
              <Text color="gray.400" ml="30px">
                {job.location}
              </Text>
            </Flex>
            <Flex>
              <Text color="gray.500" fontWeight="bold">
                Applicants
              </Text>
              <Text color="gray.400" ml="30px">
                {job.applicants?.length || 0}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text color="gray.400" mt="20px" w="60%">
                {job.description}
              </Text>

              {/* Drawer for details */}
              <Drawer.Root>
                <Drawer.Trigger asChild>
                  <Button size="sm" bg="green.500" color="blue.900">
                    MORE DETAILS
                  </Button>
                </Drawer.Trigger>
                <Portal>
                  <Drawer.Backdrop />
                  <Drawer.Positioner>
                    <Drawer.Content bgColor="blue.100">
                      <Drawer.Header>
                        <Drawer.Title>{job.company_name}</Drawer.Title>
                      </Drawer.Header>
                      <Drawer.Body>
                        <b>Position: </b>
                        <p>{job.title}</p>
                        <hr />
                        <b>Job Description: </b>
                        <p>{job.description}</p>
                        <hr />
                        <b>Required Skills:</b>
                        <Box>
                          {job.requiredSkills.map((skill, idx) => (
                            <p key={idx}>{skill}</p>
                          ))}
                        </Box>
                        <hr />
                        <b>Salary:</b> <p>{job.salary}</p>
                        <hr />
                        <b>Experience:</b> <p>{job.experience}</p>
                        <hr />
                        <b>Location:</b> <p>{job.location}</p>
                        <hr />
                        <b>Job Type:</b> <p>{job.jobType}</p>
                        <hr />
                        <b>Openings:</b> <p>{job.openings}</p>
                        <hr />
                        <b>Status:</b>{" "}
                        <p>{job.applicants?.length || 0} applicants</p>
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
        ))}
      </Stack>
    </Flex>
  );
};

export default JobsPosted;