import {
  Button,
  HStack,
  VStack,
  Box,
  Image,
  Text,
  Spacer,
  Input,
  RadioGroup,
  Heading
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loginUser } from '../reduxStore/slices/authSlice.jsx';
import logo from '../assets/pictures/jobjunction_logo.png';
import { isRejected } from "@reduxjs/toolkit";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: ""
  })
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isLoggedIn, token } = useSelector((state) => state.user)

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const changeHandler2 = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const loginHandler = async () => {
    if (!loginData.email || !loginData.password || !loginData.role) {
      toaster.create({
        title: "Missing fields",
        description: "Please fill all the required fields",
        type: "error",
      });
      console.log('Missing fields');
      return;
    }
    

    try {
      const resultAction = await dispatch(loginUser(loginData));

      if (loginUser.rejected.match(resultAction)) {
        toaster.create({
          description: resultAction.payload || "Invalid credentials",
          type: "error"
        });
        console.log(resultAction.payload, 'invalid credentials')
      } else {
        toaster.create({
          description: "Login successful",
          type: 'success'
        });
        if (loginData.role === 'student') {
          navigate('/');
        } else {
          navigate('/jobsPosted')
        }
      }
    } catch (err) {
      toaster.create({
        description: `Login failed: ${err.message || err}`,
        type: "error",
      });
      console.error("Login failed", err);
    }
  };


  return (
    <HStack height="100vh" width="100vw">
      <VStack className="welcome_sidebar">
        <HStack>
          <Image src={logo} alt="logo" h="12" w="12" />
          <Text fontSize="4xl" fontWeight="lighter" color="white">
            <strong>Job</strong>junction
          </Text>
        </HStack>

        <Spacer />

        <Box>
          <Text fontSize="4xl" fontWeight="bold" color="white" mb={2}>
            Welcome Back <br /> to JobJunction
          </Text>
          <Box width="90px" height="8px" bg="#8FF4CC" borderRadius="full" mb={2} />
          <Text color="gray.300">Sign in to continue to your account.</Text>
        </Box>
        <Spacer />
      </VStack>

      <Box className="login_register_Form" >
        <VStack className="login_register_container">
          <Heading>Login</Heading>
          <Input name="email" className="email_input inputs" placeholder="enter your email" value={loginData.email} onChange={changeHandler2} />
          <Input type="password" name="password" className="password_input inputs" placeholder="enter your password" value={loginData.password} onChange={changeHandler2} />
          <RadioGroup.Root
            name="role"
            value={loginData.role}
            onChange={changeHandler2}
          >
            <HStack gap="6">
              <RadioGroup.Item key="student" value="student">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>student</RadioGroup.ItemText>
              </RadioGroup.Item>
              <RadioGroup.Item key="recruiter" value="recruiter">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>recruiter</RadioGroup.ItemText>
              </RadioGroup.Item>
            </HStack>
          </RadioGroup.Root>

          {
            isLoading ? <Button className="login_register_BTN"><Loader2>please wait</Loader2></Button> : <Button className="login_register_BTN" onClick={loginHandler}>Sign In</Button>
          }

          <Link to="/register"><Text>Not a Member, Yes? <strong>Sign Up</strong></Text></Link>
        </VStack>
      </Box>


    </HStack>
  );
};

export default Login;