import React from 'react';
import {  Heading, Image, Box, Flex, Button} from '@chakra-ui/core'
/* Created a component to display some standard info about questions that can be reused */
export const QuestionInfo = ({ title, image, button, button_text, optionOne, optionTwo}) => {
    return (
      <Box width="90%" mb={8} p={5} shadow="md" borderWidth="2px" >
        <Heading as="h3" size="lg" mb="20px">{title} was wondering.. would you rather..</Heading>
        <Box shadow="md" borderWidth="1px">
          <Flex >
            <Flex ml={10} flexDirection="column" justifyContent="center" alignContent="center" >
              <Image  src={image} size={32}/>
            </Flex>
            <Box m={10} borderLeft="2px" borderLeftColor="#D3D3D3" shadow="md" />
              <Flex width="80%" justifyContent="center">
                <Flex mt="15px" width="70%" flexDirection="column" mb="15px" alignContent="space-between" justifyContent="space-between">
                  <Box textAlign="left" width="100" alignContent="end" mb="15px">{optionOne}</Box>
                  <Box textAlign="center" mb="15px">or..</Box>
                  <Box textAlign="end" mb="15px">{optionTwo}</Box>
                  <Button onClick={button} mb="15px">{button_text}</Button>
                </Flex>
              </Flex>
          </Flex>
        </Box>
      </Box>
    );
  }
  /* Replacing the path to a 2nd avatar png for a better resolution */
  export function getIcon(string) {
      return string = string.replace('.png','128.png')
    }
 
    
         