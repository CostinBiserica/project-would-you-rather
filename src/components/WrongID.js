import React, { Component } from 'react';
import { Heading, Box, Text } from '@chakra-ui/core';
/* Component rendered at /questions/worng_id path */
export class WrongID extends Component {
  render() {
    return (
      <Box width="100%" textAlign="center">
        <Heading as="h2">404 Error!</Heading>
        <Text>The question you tried to check it's not stored in our database, please try other question!</Text>
      </Box>
    );
  }
}

export default WrongID;
