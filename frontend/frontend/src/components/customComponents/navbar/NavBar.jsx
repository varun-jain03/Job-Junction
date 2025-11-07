import {
  Flex,
  HStack,
  Image,
  Text,
  Button,
  Box
} from "@chakra-ui/react";
import logo from "../../../assets/pictures/jobjunction_logo.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AvatarProfile from './Avatar.jsx';
import fetchCurrentUser from '../../../reduxStore/slices/authSlice.jsx';

export default function NavBar() {
  const dispatch = useDispatch();

  const { token, isLoggedIn, user } = useSelector((state) => state.user);
  const role = user?.role;

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token, user]);

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
      bg="white"
      boxShadow='md'
      px="4"
    >
      <Flex
        className="navbar"
        justify="space-between"
        align="center"
        ml="auto"
        mr="auto"
        maxW="80rem"
        height="4rem"
        borderRadius='100px'
      >

        <HStack>
          <Image src={logo} alt="logo" h="14" w="14" />
          <Text fontSize="3xl" fontWeight="lighter">
            <strong>Job</strong>junction
          </Text>
        </HStack>

        <HStack gap="20">
          {role === 'student' ? (
            <Flex gap="4">
              <Link className="nav-links" to="/" >Home</Link>
              <Link className="nav-links" to="/jobs">Jobs</Link>
              <Link className="nav-links" to="/applied">AppliedJobs</Link>
            </Flex>
          ) : role === 'recruiter' ? (
            <Flex gap="4">
              <Link className="nav-links" to="/jobsPosted">JobsPostByYou</Link>
              <Link className="nav-links" to="/applicants">Applicants</Link>
            </Flex>
          ) : null}

          {!isLoggedIn && (
            <Flex>
              <Link to="/login"><Button bg="#007BFF" color="whiteAlpha.900" _hover={{ bg: "#0056d2" }} >Login</Button></Link>
              <Link to="/register"><Button fontWeight="medium" color="gray.600" opacity={0.8} _hover={{ textDecoration: "underline" }} >Register</Button></Link>
            </Flex>
          )}
          {isLoggedIn && <AvatarProfile />}
        </HStack>
      </Flex>
    </Box>
  );
}
