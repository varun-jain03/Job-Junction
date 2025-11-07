import React, { useState } from 'react';
import { Box, Avatar, Text, Button, Flex, HStack, Input } from '@chakra-ui/react';
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../reduxStore/slices/authSlice.jsx";


const Profile = () => {
  const dispatch = useDispatch();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser);
  const [resumeFile, setResumeFile] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: Array.isArray(user?.profile?.skills)
      ? user.profile.skills.join(" ")
      : user?.profile?.skills || "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    const updatedSkillsArray = formData.skills
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      profile: {
        ...user.profile,
        bio: formData.bio,
        skills: updatedSkillsArray,
      },
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    try {
      const basicRes = await fetch("https://job-junction-backend-91n3.onrender.com/user/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
        }),
      });

      const form = new FormData();
      form.append("bio", formData.bio);
      form.append("skills", updatedSkillsArray.join(", "));
      if (resumeFile) form.append("resume", resumeFile);

      const profileRes = await fetch("https://job-junction-backend-91n3.onrender.com/user/profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      const basicData = await basicRes.json();
      const profileData = await profileRes.json();

      if (!basicRes.ok || !profileRes.ok) {
        throw new Error(
          basicData.msg || profileData.msg || "Failed to update user"
        );
      }

      dispatch(updateUserProfile(updatedUser));

      alert("Profile updated successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile ❌");
    }
  };

  return (
    <Flex
      className='home-container'
      bg='blue.900'
      mt='6rem'
      h='80%'
      maxW="80rem"
      gap='20px'
      ml="auto"
      mr="auto"
      borderRadius='100'
      rounded='4xl'
      justifyContent='space-evenly'
      alignItems='center'
    >
      <Box
        width='60%'
        bg='white'
        rounded='4xl'
        height='90%'
        p='12px'
      >
        {/* Name */}
        <HStack justify="space-between" h="50px">
          <Text fontWeight="medium" color="gray.600">
            Name
          </Text>
          <Input
            color="gray"
            w="200px"
            border="white"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
        </HStack>
        <hr />

        {/* Email */}
        <HStack justify="space-between" h="50px">
          <Text fontWeight="medium" color="gray.600">
            Email account
          </Text>
          <Input
            color="gray"
            w="200px"
            border="white"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </HStack>
        <hr />

        {/* Mobile */}
        <HStack justify="space-between" h="50px">
          <Text fontWeight="medium" color="gray.600">
            Mobile number
          </Text>
          <Input
            color="gray"
            w="200px"
            border="white"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone number"
          />
        </HStack>
        <hr />

        {/* Bio */}
        <HStack justify="space-between" h="50px">
          <Text fontWeight="medium" color="gray.600">
            Bio
          </Text>
          <Input
            color="gray"
            w="200px"
            border="white"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Bio"
          />
        </HStack>
        <hr />

        {user.role === "student" ? (
          <>
            {/* Skills */}
            <HStack justify="space-between" h="50px">
              <Text fontWeight="medium" color="gray.600">Skills</Text>
              <Input
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                w="200px"
                placeholder="Skills (space separated)"
              />
            </HStack>
            <hr />

            {/* Resume */}
            <HStack justify="space-between" h="50px">
              <Text fontWeight="medium" color="gray.600">Resume</Text>
              <Input
                type="file"
                name="resume"
                accept=".pdf"
                onChange={(e) => setResumeFile(e.target.files[0])}
                w="200px"
                border="white"
              />
            </HStack>
            <hr />

          </>
        ) : (
          <>
            {/* Company Name for Recruiter */}
            <HStack justify="space-between" h="50px">
              <Text fontWeight="medium" color="gray.600">Company Name</Text>
              <Input
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                w="200px"
                placeholder="Company Name"
              />
            </HStack>
            <hr />
          </>
        )}

        <Button
          colorScheme="blue"
          width="full"
          mt={6}
          rounded="lg"
          fontWeight="medium"
          bg="blue.400"
          onClick={handleSave}
        >
          Save Change
        </Button>

      </Box>


      <Box
        width='30%'
        bg='white'
        rounded='4xl'
        height='90%'
        boxShadow="md"
        p='12px'
        fontFamily="Poppins, sans-serif"
      >
        {/* Avatar */}
        <Flex justify="space-between" align="center" h='100px'>
          <Flex align="center" gap='4'>
            <Avatar.Root>
              <Avatar.Fallback name={user.name} />
              <Avatar.Image src="" />
            </Avatar.Root>
            <Box>
              <Text fontWeight="semibold">{user.name}</Text>
              <Text fontSize="sm" color="gray.500">
                {user.email}
              </Text>
            </Box>
          </Flex>
        </Flex>
        <hr />

        {/* name */}
        <HStack justify="space-between" h='50px' >
          <Text fontWeight="medium" color="gray.600">Name</Text>
          <Text color='gray' >{user.name}</Text>
        </HStack>
        <hr />

        {/* email */}
        <HStack justify="space-between" h='50px' >
          <Text fontWeight="medium" color="gray.600">Email account</Text>
          <Text color='gray' >{user.email}</Text>
        </HStack>
        <hr />

        {/* mobile number */}
        <HStack justify="space-between" h='50px' >
          <Text fontWeight="medium" color="gray.600">Mobile number</Text>
          <Text color='gray' >{user.phoneNumber}</Text>
        </HStack>
        <hr />

        {/* role */}
        <HStack justify="space-between" h='50px' >
          <Text fontWeight="medium" color="gray.600">role</Text>
          <Text color='gray' >{user.role}</Text>
        </HStack>
        <hr />

        {user.role === "student" ? (
          <>
            <HStack justify="space-between" h="50px">
              <Text fontWeight="medium" color="gray.600">Resume</Text>
              {user.profile.resume ? (
                <Button
                  as="a"
                  href={`https://job-junction-backend-91n3.onrender.com/${user.profile.resume}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="sm"
                  colorScheme="teal"
                  color='gray'
                >
                  View Resume
                </Button>
              ) : (
                <Text color="gray">No resume uploaded</Text>
              )}
            </HStack>
            <hr />
          </>
        ) : (
          <>
            {/* Company Name for Recruiter */}
            <HStack justify="space-between" h="50px">
              <Text fontWeight="medium" color="gray.600">Company Name</Text>
              <Text color='gray' >{user.profile.company_name}</Text>
            </HStack>
            <hr />
          </>
        )}
      </Box>
    </Flex>
  )
}

export default Profile;


