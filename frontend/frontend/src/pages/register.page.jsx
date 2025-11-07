import {
  Button,
  HStack,
  VStack,
  Box,
  Image,
  Text,
  Spacer,
  Input,
  Heading,
  RadioGroup
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import logo from '../assets/pictures/jobjunction_logo.png';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../reduxStore/slices/authSlice.jsx';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';


const Register = () => {
  console.log("Register page mounted");
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: ""
  })
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isLoggedIn } = useSelector((state) => state.user);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate('/');
  //   }
  // }, [isLoggedIn, navigate]);

  const changeHandler = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value
    })
  }

  const singinHandler = async () => {
    if (!formdata.name || !formdata.email || !formdata.phoneNumber || !formdata.password || !formdata.role) {
      toaster.create({
        title: "Missing fields",
        description: "Please fill all the required fields",
        type: "error",
      });
      return;
    }

    try {
      const newRegister = await dispatch(registerUser(formdata));
      console.log(newRegister.meta.requestStatus);
      if (newRegister.meta.requestStatus === 'rejected') {
        toaster.create({
          description: newRegister.payload,
          type: "error",
        });
      }
      else {
        toaster.create({
          description: "Registration successfulys",
          type: "success",
        });
        navigate('/login')
      }
    } catch (err) {
      toaster.create({
        description: `Registration failed: ${err}`,
        type: "error",
      });
      console.error("Registration failed", err);
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
          <Heading>Sign Up</Heading>

          <Input
            className="name_input inputs"
            value={formdata.name}
            placeholder="enter your name"
            name="name"
            onChange={changeHandler}
          />
          <Input
            className="email_input inputs"
            value={formdata.email}
            placeholder="enter your email"
            name="email"
            onChange={changeHandler}
          />
          <Input
            className="phone_input inputs"
            value={formdata.phoneNumber}
            placeholder="enter your Phone No."
            name="phoneNumber"
            onChange={changeHandler}
          />
          <Input
            className="password_input inputs"
            type="password"
            value={formdata.password}
            placeholder="enter your password"
            name="password"
            onChange={changeHandler}
          />
          <RadioGroup.Root
            name="role"
            value={formdata.role}
            onChange={changeHandler}
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
            isLoading ? <Button className="login_register_BTN"><Loader2>please wait</Loader2></Button> : <Button className="login_register_BTN" onClick={singinHandler}>Sign Up</Button>
          }

          <Link to="/login"><Text>Already a Member, Yes? <strong>Log in</strong></Text></Link>
        </VStack>
      </Box>
    </HStack>
  )
}

export default Register;