import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { useState } from 'react';

// fontawesome
import bagIcon from '../../../assets/fontawesome/bag-shopping-solid-full.svg';
import buildingIcon from '../../../assets/fontawesome/building-columns-solid-full.svg';
import calculatorIcon from '../../../assets/fontawesome/calculator-solid-full.svg';
import calenderIcon from '../../../assets/fontawesome/calendar-solid-full.svg';
import codeIcon from '../../../assets/fontawesome/code-solid-full.svg';
import databaseIcon from '../../../assets/fontawesome/database-solid-full.svg';
import globeIcon from '../../../assets/fontawesome/globe-solid-full.svg';
import houseIcon from '../../../assets/fontawesome/house-laptop-solid-full.svg';
import paletteIcon from '../../../assets/fontawesome/palette-solid-full.svg';
import userIcon from '../../../assets/fontawesome/users-solid-full.svg';

const PopularCategories = () => {
  const [categorys] = useState([
    { icon: buildingIcon, Category: 'Banking' },
    { icon: houseIcon, Category: 'Work From Home' },
    { icon: userIcon, Category: 'HR' },
    { icon: bagIcon, Category: 'Sales' },
    { icon: calculatorIcon, Category: 'Accounting' },
    { icon: bagIcon, Category: 'Customer Support' },
    { icon: calenderIcon, Category: 'Event Management' },
    { icon: globeIcon, Category: 'IT' },
    { icon: databaseIcon, Category: 'SQL' },
    { icon: paletteIcon, Category: 'Graphic Design' },
    { icon: bagIcon, Category: 'Digital Marketing' },
    { icon: codeIcon, Category: 'Web Developer' }
  ]);

  return (
    <Box className="popular-categories">
      <h1>Popular Categories</h1>
      <Grid
        className='categories-grid'
        templateColumns="repeat(6, 1fr)"
        gap={6}
        p={4}
        justifyItems="center"
      >
        {categorys.map((category, index) => (
          <Flex
            key={index}
            className='categories-container'
          >
            <img className="categorys-icon" src={category.icon} alt={category.Category} />
            <Text fontSize="sm" fontWeight="medium"> {category.Category} </Text>

          </Flex>
        ))}
      </Grid>
    </Box>
  );
};

export default PopularCategories;
