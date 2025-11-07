import React, { useEffect, useState } from "react";
import { Box, Avatar, Text, Button, Flex, HStack, Input } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../reduxStore/slices/authSlice.jsx";

const CreateCompany = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("accessToken");

  const [formData, setFormData] = useState({
    companyName: "",
    description: "",
    website: "",
    location: "",
  });

  const [existingCompany, setExistingCompany] = useState(null);

  // Fetch company details for this user (if exists)
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await fetch("https://job-junction-backend-91n3.onrender.com/company", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok && data.companies && data.companies.length > 0) {
          const company = data.companies[0];
          setExistingCompany(company);
          setFormData({
            companyName: company.companyName || "",
            description: company.description || "",
            website: company.website || "",
            location: company.location || "",
          });
        }
      } catch (err) {
        console.error("Error fetching company:", err);
      }
    };
    if (token) fetchCompany();
  }, [token]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle save (register or update)
  const handleSave = async () => {
    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    const url = existingCompany
      ? `https://job-junction-backend-91n3.onrender.com/company/update/${existingCompany._id}`
      : "https://job-junction-backend-91n3.onrender.com/company/register";
    const method = existingCompany ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Failed to save company");
      }

      // update user in localStorage (for company_name preview)
      const updatedUser = {
        ...user,
        profile: {
          ...user.profile,
          company_name: formData.companyName,
        },
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      dispatch(updateUserProfile(updatedUser));

      alert(
        existingCompany
          ? "Company updated successfully ✅"
          : "Company registered successfully ✅"
      );
    } catch (err) {
      console.error(err);
      alert("Failed to save company ❌");
    }
  };

  return (
    <Flex
      className="home-container"
      bg="blue.900"
      mt="6rem"
      h="80%"
      maxW="80rem"
      gap="20px"
      ml="auto"
      mr="auto"
      borderRadius="100"
      rounded="4xl"
      justifyContent="space-evenly"
      alignItems="center"
    >
      {/* LEFT BOX (Inputs) */}
      <Box
        width="60%"
        bg="white"
        rounded="4xl"
        height="90%"
        p="12px"
        display="flex"
        flexDirection="column"
      >
        <Box flex="1">
          {/* Company Name */}
          <HStack justify="space-between" h="50px">
            <Text fontWeight="medium" color="gray.600">Company Name</Text>
            <Input
              color="gray"
              w="200px"
              border="white"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company Name"
            />
          </HStack>
          <hr />

          {/* Description */}
          <HStack justify="space-between" h="50px">
            <Text fontWeight="medium" color="gray.600">Description</Text>
            <Input
              color="gray"
              w="200px"
              border="white"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
            />
          </HStack>
          <hr />

          {/* Website */}
          <HStack justify="space-between" h="50px">
            <Text fontWeight="medium" color="gray.600">Website</Text>
            <Input
              color="gray"
              w="200px"
              border="white"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Website"
            />
          </HStack>
          <hr />

          {/* Location */}
          <HStack justify="space-between" h="50px">
            <Text fontWeight="medium" color="gray.600">Location</Text>
            <Input
              color="gray"
              w="200px"
              border="white"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
            />
          </HStack>
          <hr />
        </Box>

        {/* Save Button */}
        <Button
          colorScheme="blue"
          width="full"
          mt="auto"
          rounded="lg"
          fontWeight="medium"
          bg="blue.400"
          onClick={handleSave}
        >
          {existingCompany ? "Update Company" : "Register Company"}
        </Button>
      </Box>

      {/* RIGHT BOX (Preview) */}
      <Box
        width="30%"
        bg="white"
        rounded="4xl"
        height="90%"
        boxShadow="md"
        p="12px"
        fontFamily="Poppins, sans-serif"
      >
        {/* Avatar */}
        <Flex justify="space-between" align="center" h="100px">
          <Flex align="center" gap="4">
            <Avatar.Root>
              <Avatar.Fallback name={user.name} />
              <Avatar.Image src="" />
            </Avatar.Root>
            <Box>
              <Text fontWeight="semibold">{user.name}</Text>
              <Text fontSize="sm" color="gray.500">{user.email}</Text>
            </Box>
          </Flex>
        </Flex>
        <hr />

        {/* Company Name */}
        <HStack justify="space-between" h="50px">
          <Text fontWeight="medium" color="gray.600">Company Name</Text>
          <Text color="gray">{formData.companyName || "Company Name"}</Text>
        </HStack>
        <hr />

        {/* Description */}
        <HStack justify="space-between" h="50px">
          <Text fontWeight="medium" color="gray.600">Description</Text>
          <Text color="gray">{formData.description || "Description"}</Text>
        </HStack>
        <hr />

        {/* Website */}
        <HStack justify="space-between" h="50px">
          <Text fontWeight="medium" color="gray.600">Website</Text>
          <Text color="gray">{formData.website || "Website"}</Text>
        </HStack>
        <hr />

        {/* Location */}
        <HStack justify="space-between" h="50px">
          <Text fontWeight="medium" color="gray.600">Location</Text>
          <Text color="gray">{formData.location || "Location"}</Text>
        </HStack>
        <hr />
      </Box>
    </Flex>
  );
};

export default CreateCompany;













// import React from 'react'
// import { Box, Avatar, Text, Button, Flex, HStack, Input } from '@chakra-ui/react';


// const CreateCompnay = () => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   return (
//     <Flex
//       className='home-container'
//       bg='blue.900'
//       mt='6rem'
//       h='80%'
//       maxW="80rem"
//       gap='20px'
//       ml="auto"
//       mr="auto"
//       borderRadius='100'
//       rounded='4xl'
//       justifyContent='space-evenly'
//       alignItems='center'
//     >
//       <Box
//         width="60%"
//         bg="white"
//         rounded="4xl"
//         height="90%"
//         p="12px"
//         display="flex"
//         flexDirection="column"
//       >
//         <Box flex="1">
//           {/* companyName */}
//           <HStack justify="space-between" h="50px">
//             <Text fontWeight="medium" color="gray.600">Company Name</Text>
//             <Input
//               color="gray"
//               w="200px"
//               border="white"
//               name="Company Name"
//               placeholder="Company Name"
//             />
//           </HStack>
//           <hr />

//           {/* description */}
//           <HStack justify="space-between" h="50px">
//             <Text fontWeight="medium" color="gray.600">Description</Text>
//             <Input
//               color="gray"
//               w="200px"
//               border="white"
//               name="description"
//               placeholder="Description"
//             />
//           </HStack>
//           <hr />

//           {/* website */}
//           <HStack justify="space-between" h="50px">
//             <Text fontWeight="medium" color="gray.600">Website</Text>
//             <Input
//               color="gray"
//               w="200px"
//               border="white"
//               name="website"
//               placeholder="Website"
//             />
//           </HStack>
//           <hr />

//           {/* location */}
//           <HStack justify="space-between" h="50px">
//             <Text fontWeight="medium" color="gray.600">Location</Text>
//             <Input
//               color="gray"
//               w="200px"
//               border="white"
//               name="location"
//               placeholder="Location"
//             />
//           </HStack>
//           <hr />
//         </Box>

//         {/* Save button at bottom */}
//         <Button
//           colorScheme="blue"
//           width="full"
//           mt="auto"
//           rounded="lg"
//           fontWeight="medium"
//           bg="blue.400"
//         >
//           Save Change
//         </Button>
//       </Box>

//       <Box
//         width='30%'
//         bg='white'
//         rounded='4xl'
//         height='90%'
//         boxShadow="md"
//         p='12px'
//         fontFamily="Poppins, sans-serif"
//       >
//         {/* Avatar */}
//         <Flex justify="space-between" align="center" h='100px'>
//           <Flex align="center" gap='4'>
//             <Avatar.Root>
//               <Avatar.Fallback name={user.name} />
//               <Avatar.Image src="" />
//             </Avatar.Root>
//             <Box>
//               <Text fontWeight="semibold">{user.name}</Text>
//               <Text fontSize="sm" color="gray.500">
//                 {user.email}
//               </Text>
//             </Box>
//           </Flex>
//         </Flex>
//         <hr />

//         {/* name */}
//         <HStack justify="space-between" h='50px' >
//           <Text fontWeight="medium" color="gray.600">Company Name</Text>
//           <Text color='gray' >Company Name</Text>
//         </HStack>
//         <hr />

//         {/* email */}
//         <HStack justify="space-between" h='50px' >
//           <Text fontWeight="medium" color="gray.600">description</Text>
//           <Text color='gray' >description</Text>
//         </HStack>
//         <hr />

//         {/* mobile number */}
//         <HStack justify="space-between" h='50px' >
//           <Text fontWeight="medium" color="gray.600">website</Text>
//           <Text color='gray' >website</Text>
//         </HStack>
//         <hr />

//         {/* role */}
//         <HStack justify="space-between" h='50px' >
//           <Text fontWeight="medium" color="gray.600">location</Text>
//           <Text color='gray' >location</Text>
//         </HStack>
//         <hr />


//       </Box>
//     </Flex >
//   )
// }

// export default CreateCompnay