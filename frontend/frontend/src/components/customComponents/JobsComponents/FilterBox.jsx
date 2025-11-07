import { Stack, Box, Flex, Image, Heading, Collapsible } from '@chakra-ui/react'
import { React, useState } from 'react'
import filterImg from '../../../assets/fontawesome/filter-solid-full.svg';



const items = [
  {
    value: "FilterByLocation",
    title: "Location",
    text: [
      "Delhi", "Bangalore", "Pune",
      "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
      "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
      "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
      "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
      "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Jammu and Kashmir", "Ladakh"
    ]
  },
  {
    value: "FilterByExperience",
    title: "Experience",
    text: ["fresher", "1-2 years", "3-5 years", "5+ years"]
  },
  {
    value: "FilterByType",
    title: "Job Type",
    text: ["full-time", "part-time"]
  },
];

const FilterBox = ({ selectedFilters, setSelectedFilters }) => {
  
  const handleCheckboxChange = (category, option) => {
    const lowerOption = option.toLowerCase();
    setSelectedFilters((prev) => {
      const current = prev[category];
      const updated = current.includes(lowerOption)
        ? current.filter((item) => item !== lowerOption)
        : [...current, lowerOption];

      return { ...prev, [category]: updated };
    });
  };


  console.log("Selected Filters:", selectedFilters);

  return (
    <Stack className="filter-main-container" bg="whitesmoke" p={4} rounded="md" spacing={4}>

      <Flex h="10" w="200px" alignItems="center" gap={2}>
        <Image rounded="md" src={filterImg} alt="filter icon" w="20px" h="20px" />
        <Heading fontSize="16px">Filter</Heading>
      </Flex>

      {items.map((item, index) => (
        <Collapsible.Root>
          <Box className='filter-categories' key={index}>
            <fieldset>
              <Collapsible.Trigger><legend style={{ fontWeight: "600" }}>{item.title}</legend></Collapsible.Trigger>

              {item.text.map((option, idx) => (
                <Collapsible.Content key={idx}>
                  <Box mt={2} display="flex" alignItems="center" gap={2}>
                    <input
                      type="checkbox"
                      id={`${item.value}-${idx}`}
                      name={item.value}
                      value={option}
                      checked={selectedFilters[item.value].includes(option.toLowerCase())}
                      onChange={() => handleCheckboxChange(item.value, option)}
                    />
                    <label htmlFor={`${item.value}-${idx}`}>{option}</label>
                  </Box>
                </Collapsible.Content>
              ))}
            </fieldset>
          </Box>
        </Collapsible.Root>
      ))}
    </Stack>
  );

};



export default FilterBox