import { Box, Button, Input, HStack, Text, Grid, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

//components
import SearchBox from '../components/customComponents/HomeComponents/SearchBox.jsx';
import FeaturedCompanies from '../components/customComponents/HomeComponents/FeaturedCompanies.jsx';
import PopularCategories from '../components/customComponents/HomeComponents/PopularCategories.jsx';
import MidSection from '../components/customComponents/HomeComponents/MidSection.jsx';

const Home = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [category, setCategory] = useState([
    {}
  ]);


  return (
    <Box pt="4rem">
      <SearchBox />
      <VStack
        className='home-container'
        justify="space-between"
        align="center"
        ml="auto"
        mr="auto"
        maxW="80rem"
        h='fit-content'
        borderRadius='100'
      >
        <FeaturedCompanies />
        <MidSection />
        <PopularCategories />
      </VStack>
    </Box>
  )
}

export default Home;
