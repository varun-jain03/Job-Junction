import React from 'react'
import { Box, Button, Input, HStack, Text } from '@chakra-ui/react';
import { MdSearch, MdLocationOn } from 'react-icons/md';
import { Icon } from '@chakra-ui/react';


const SearchBox = () => {
  return (
    <Box className="search-box">
      <h1>Over 10,000+ jobs to apply</h1>
      <Text mb='20px'>Your Next Big Career Move Starts Right Here – Explore the Best Job Opportunities and <br /> Take the First Step Toward Your Future!</Text>
      <HStack gap="0" bg='white' borderRadius='10px' w='600px' px='5px' >
        <Icon size="lg" color="pink.700">
          <MdSearch color='gray' />
        </Icon>
        <Input
          placeholder='Search By Skills, Company or Jobs'
          bg='white'
          border='none'
          width='300px'
          h='50px'
        />
        <Icon size="lg" color="pink.700">
          <MdLocationOn color='gray' />
        </Icon>
        <Input
          placeholder='Location'
          bg='white'
          border='none'
          w='200px'
        />
        <Button
          bg='rgb(37 99 235 / var(--tw-bg-opacity, 1))'
          w='100px'
          color='white'
        >Search</Button>
      </HStack>
    </Box>
  )
}

export default SearchBox;

