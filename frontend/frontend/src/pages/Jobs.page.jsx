import { Box, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import FilterBox from '../components/customComponents/JobsComponents/FilterBox.jsx';
import AllJobs from '../components/customComponents/JobsComponents/AllJobs.jsx';
import Ad from '../components/customComponents/JobsComponents/Ad.jsx';

const Jobs = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    FilterByLocation: [],
    FilterByExperience: [],
    FilterByType: [],
  });

  return (
    <Flex
      className='home-container'
      mt='4rem'
      h='fit-content'
      maxW="80rem"
      gap='20px'
      ml="auto"
      mr="auto"
      pt='4rem'
      pb='4rem'
      borderRadius='100'
    >
      <FilterBox selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      <AllJobs selectedFilters={selectedFilters} />
      <Ad />

    </Flex>

  )
}

export default Jobs;