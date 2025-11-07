import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Stack,
  VStack,
  Button,
  HStack,
} from "@chakra-ui/react";

const Applicants = () => {
  const [applicantsData, setApplicantsData] = useState(null);
  const token = localStorage.getItem("accessToken");

  // Fetch all applicants
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await fetch("https://job-junction-backend-91n3.onrender.com/application/applicants", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setApplicantsData(data);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };
    fetchApplicants();
  }, [token]);

  // ✅ Status update handler
  const handleStatusUpdate = async (applicationId, status) => {
    try {
      const res = await fetch(
        `https://job-junction-backend-91n3.onrender.com/application/status/${applicationId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();
      console.log("Status update response:", data);

      // ✅ Update state locally to reflect the new status
      setApplicantsData((prevData) => {
        const updatedJobs = prevData.jobs.map((job) => ({
          ...job,
          applicants: job.applicants.map((app) =>
            app._id === applicationId ? { ...app, status } : app
          ),
        }));
        return { ...prevData, jobs: updatedJobs };
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (!applicantsData) {
    return <Text textAlign="center" mt={10}>Loading applicants...</Text>;
  }

  const { jobs } = applicantsData;

  if (!jobs || jobs.length === 0) {
    return <Text textAlign="center" mt={10}>No applicants found.</Text>;
  }

  return (
    <Box
      p={6}
      className="home-container"
      mt="4rem"
      maxW="80rem"
      ml="auto"
      mr="auto"
      pt="4rem"
      pb="4rem"
    >
      <Heading mb={6} textAlign="center" fontSize="24px">
        Applicants for Your Jobs
      </Heading>

      <VStack spacing={8} align="stretch">
        {jobs.map((job) => (
          <Box key={job._id} p={5} shadow="md" borderWidth="1px" borderRadius="lg">
            <Heading fontSize="xl">{job.title}</Heading>
            <Text mt={2} color="gray.600">
              {job.company_name} • {job.location}
            </Text>

            <Text mt={3} fontWeight="bold">
              Applicants ({job.applicants?.length || 0})
            </Text>

            {job.applicants && job.applicants.length > 0 ? (
              <Stack mt={3} spacing={3}>
                {job.applicants.map((app) => {
                  const applicant = app.applicant || app.applicantId || {};
                  const appId = app._id;

                  return (
                    <Box
                      key={appId}
                      borderWidth="1px"
                      borderRadius="md"
                      p={3}
                      bg={
                        app.status === "accepted"
                          ? "green.50"
                          : app.status === "rejected"
                          ? "red.50"
                          : "white"
                      }
                    >
                      <Text><strong>Name:</strong> {applicant?.name || "N/A"}</Text>
                      <Text><strong>Email:</strong> {applicant?.email || "N/A"}</Text>
                      <Text><strong>Phone:</strong> {applicant?.phoneNumber || "N/A"}</Text>
                      <Text>
                        <strong>Skills:</strong>{" "}
                        {applicant?.profile?.skills?.length
                          ? applicant.profile.skills.join(", ")
                          : "N/A"}
                      </Text>
                      <Text><strong>Status:</strong> {app.status || "pending"}</Text>

                      {/* ✅ Action buttons or result message */}
                      {app.status === "pending" ? (
                        <HStack spacing={3} mt={3}>
                          {applicant?.profile?.resume && (
                            <Button
                              as="a"
                              href={`https://job-junction-backend-91n3.onrender.com/${applicant.profile.resume}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              colorScheme="blue"
                              bg="black"
                              color="white"
                              size="sm"
                            >
                              View Resume
                            </Button>
                          )}
                          <Button
                            bg="red.500"
                            color="white"
                            size="sm"
                            onClick={() => handleStatusUpdate(appId, "rejected")}
                          >
                            Reject
                          </Button>
                          <Button
                            bg="green.500"
                            color="white"
                            size="sm"
                            onClick={() => handleStatusUpdate(appId, "accepted")}
                          >
                            Accept
                          </Button>
                        </HStack>
                      ) : app.status === "rejected" ? (
                        <Text mt={3} color="red.600" fontWeight="medium">
                          ❌ You have rejected this applicant.
                        </Text>
                      ) : (
                        <Box mt={3}>
                          <Text color="green.700" fontWeight="medium">
                            ✅ You have accepted this applicant.
                          </Text>
                          <Text mt={1}>📧 {applicant?.email}</Text>
                          <Text>📞 {applicant?.phoneNumber}</Text>
                          <Text mt={1} color="gray.600">
                            Contact the applicant for further process.
                          </Text>
                        </Box>
                      )}
                    </Box>
                  );
                })}
              </Stack>
            ) : (
              <Text mt={2} color="gray.500">
                No applicants yet.
              </Text>
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Applicants;
