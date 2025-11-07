import React from 'react'
import { HStack, Box, Text, Button, Image } from "@chakra-ui/react"
import { Link } from 'react-router-dom'

//images
import editImage from '../../../assets/pictures/update-profile.jpg'
import browerImage from '../../../assets/pictures/brower-man.jpg'

const MidSection = () => {
  return (
    <HStack
      w='100%'
      h='393px'
      mt='100px'
    >
      <HStack
        w='100%'
        h='393px'
        borderRadius='3xl'
        bg='#E60278'
        p='10px'
      >
        <Box className='min-section-box' >
          <Text color='#FFFFFF' font='inherit' fontSize='26px' fontWeight='medium' textAlign="left" >
            End the job hunting and browse it right now.
          </Text>
          <Button bg='#FFFFFF' color='black' w='100%' mt='10'><Link to='/' >Browse</Link></Button>
        </Box>
        <Box className='min-section-box-image' >
          <Image src={browerImage} h='100%' w='100%' borderRadius='3xl' />
        </Box>
      </HStack>

      <HStack
        w='100%'
        h='393px'
        borderRadius='3xl'
        bg='#F5F7FA'
        p='10px'
      >
        <Box className='min-section-box' >
          <Text color='#1C1C1C' font='inherit' fontSize='26px' fontWeight='medium' textAlign="left" >
            Make your JobJunction profile stand out to employers
          </Text>
          <Button bg='#E60278' color='white' w='100%' mt='10'><Link to='/profile' >Edit Profile</Link></Button>
        </Box>
        <Box className='min-section-box-image' >
          <Image src={editImage} h='100%' w='100%' borderRadius='3xl' />
        </Box>
      </HStack>

    </HStack>
  )
}

export default MidSection