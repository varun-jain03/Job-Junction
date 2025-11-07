import React from 'react'
import { Box, Flex, HStack, Text, Image } from '@chakra-ui/react';

//icon
import linkedinIcon from '../../../assets/fontawesome/linkedin-brands-solid-full.svg';
import XIcon from '../../../assets/fontawesome/square-x-twitter-brands-solid-full.svg';
import instaIcon from '../../../assets/fontawesome/instagram-brands-solid-full.svg';
import gitIcon from '../../../assets/fontawesome/square-github-brands-solid-full.svg';
import logo from '../../../assets/pictures/jobjunction_logo.png';

const Footer = () => {
  return (
    <footer>
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
          <Text fontSize='2xs' >@MADE BY: varun jain</Text>
        </HStack>

        <Flex>
          <a href="https://www.linkedin.com/in/varun-jain-6b088b286" target='_blank'><img className='socialIcon' src={linkedinIcon} /></a>
          <a><img className='socialIcon' src={instaIcon} /></a>
          <a href="https://x.com/huntersungjiin" target='_blank'><img className='socialIcon' src={XIcon} /></a>
          <a href="https://github.com/varun-jain03" target='_blank'><img className='socialIcon' src={gitIcon} /></a>
        </Flex>
      </Flex>
    </footer>
  )
}

export default Footer;
//
// 