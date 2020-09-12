import React from 'react';
import { Heading, Box, Text } from '@chakra-ui/core';
/* Component rendered at /questions/worng_id path */
const WrongID = () => {
    return (
      <Box width="100%" textAlign="center">
        <Heading as="h2">404 Error!</Heading>
        <Text>The question you tried to check it's not stored in our database, please try other question!</Text>
      </Box>
    );
  
}

export default WrongID;
