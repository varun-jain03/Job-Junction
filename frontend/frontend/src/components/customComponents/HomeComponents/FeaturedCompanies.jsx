import React from 'react'
import { Box, Grid } from '@chakra-ui/react';

import amazonImage from '../../../assets/pictures/amazon-logo.png';
import googleImage from '../../../assets/pictures/google-logo.png';
import infosysImage from '../../../assets/pictures/infosys-logo.png';
import iciciImage from '../../../assets/pictures/icici-logo.png';
import microsoftImage from '../../../assets/pictures/microsoft-logo.png';
import walmartImage from '../../../assets/pictures/walmart-logo.png';
import HDFCImage from '../../../assets/pictures/HDFC-logo.png';
import samsungImage from '../../../assets/pictures/samsung-logo.png'
import kpmgImage from '../../../assets/pictures/kpmg-logo.png';
import metaImage from '../../../assets/pictures/meta-logo.png';
import intelImage from '../../../assets/pictures/intel-logo.png';
import paypalImage from '../../../assets/pictures/paypal-logo.png';

const FeaturedCompanies = () => {
  return (
    <Box className='featured-companies'>
      <h1>Trusted By</h1>
      <Grid
        templateColumns="repeat(6, 1fr)"
        gap={6}
        p={4}
        justifyItems="center"
      >
        <img className='featured-companies-logo' src={microsoftImage} alt="microsoftImage" />
        <img className='featured-companies-logo' src={googleImage} alt="googleImage" />
        <img className='featured-companies-logo' src={amazonImage} alt="amazonImage" />
        <img className='featured-companies-logo' src={iciciImage} alt="iciciImage" />
        <img className='featured-companies-logo' src={walmartImage} alt="walmartImage" />
        <img className='featured-companies-logo' src={samsungImage} alt="samsungImage" />
        <img className='featured-companies-logo' src={infosysImage} alt="infosysImage" />
        <img className='featured-companies-logo' src={HDFCImage} alt="HDFCImage" />
        <img className='featured-companies-logo' src={kpmgImage} alt="kpmgImage" />
        <img className='featured-companies-logo' src={metaImage} alt="metaImage" />
        <img className='featured-companies-logo' src={intelImage} alt="intelImage" />
        <img className='featured-companies-logo' src={paypalImage} alt="paypalImage" />
      </Grid>
    </Box>
  )
}

export default FeaturedCompanies