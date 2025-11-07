import React from 'react';
import {
  HStack,
  Text,
  Popover,
  Avatar,
  Stack,
  Button,
} from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toaster } from "@/components/ui/toaster";
import { logout } from '../../../reduxStore/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const AvatarProfile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      dispatch(logout());
      toaster.create({
        description: `logout successful`,
        type: "info",
      });
      navigate('/login')
    } catch (error) {
      toaster.create({
        description: `logout failed: ${error.message || error}`,
        type: "error",
      });
      console.error("logout failed", err);
    }
  }

  return (
    <Popover.Root>
      <Popover.Anchor>
        <Popover.Trigger asChild>
          <Avatar.Root>
            <Avatar.Fallback />
            <Avatar.Image />
          </Avatar.Root>
        </Popover.Trigger>
      </Popover.Anchor>

      <Popover.Positioner>
        <Popover.Content>
          <Popover.Arrow />
          <Popover.Body>
            <Popover.Title fontWeight="medium" color="whiteAlpha.900">
              <Stack gap="8">
                <HStack key="" gap="4">
                  <Avatar.Root>
                    <Avatar.Fallback name="varun jain" />
                    <Avatar.Image />
                  </Avatar.Root>

                  <Stack gap="0">
                    <Text fontWeight="medium">{user.name}</Text>
                    <Text color="fg.muted" textStyle="sm">
                      {user.email}
                    </Text>
                  </Stack>

                </HStack>
                <Stack>
                  <Button><Link to="/Profile">View Profile</Link></Button>
                  {/* ✅ Show this only if the user is a recruiter */}
                  {user?.role === "recruiter" && (
                    <Button as={Link} to="/company-details">
                      Manage Company Details
                    </Button>
                  )}
                  <Button onClick={logoutHandler}>Logout</Button>
                </Stack>
              </Stack>
            </Popover.Title>

            <Text my="4" color="whiteAlpha.900"></Text>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  )
}

export default AvatarProfile