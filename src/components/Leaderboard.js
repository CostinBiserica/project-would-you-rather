import React, { Component } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import {  Heading, Image, SimpleGrid, Divider, Box, Flex} from '@chakra-ui/core'
import { getIcon } from './QuestionInfo.js'


export class Leaderboard extends Component {
  static propType = {
    users: PropType.object.isRequired
  };
  render() {
   const { users } = this.props;
   /* Mapping the users to a new scoreboard form, extracting only the information needed to create the Leaderboard */
   const scoreBoard = Object.values(users).map(user=>({
          id: user.id,
          name: user.name,
          avatarURL: user.avatarURL,
          answers: Object.values(user.answers).length,
          questionsCreated: user.questions.length,
          total: Object.values(user.answers).length + user.questions.length
        })).sort((a, b) => b.total - a.total)
       
    return (
      <Flex mt={15} flexDirection="column" justifyContent="center" alignItems="center">
        {scoreBoard.map((user, index) => (
        <Box key={user.id} width="60%" mb={8} p={5} shadow="md" borderWidth="2px" >
          <Heading size="md" mb={5}>#{index+1 +" "+user.name}</Heading>
            <Box width="100%" mb={8} p={5} shadow="md" borderWidth="2px" >
              <Flex >
                <Flex ml={25} flexDirection="column" justifyContent="center" alignItems="center" >
                  <Image  src={getIcon(user.avatarURL)} size={32}/>
                </Flex>
                <Divider orientation="vertical" />
                  <Flex flexDirection="row" width="70%" justifyContent="center" alignItems="center">
                    <Flex  width="100%" flexDirection="column"  alignItems="center" justifyContent="center">
                      <SimpleGrid width="50%" columns={1} spacing={15}>
                        <Box>Total question answered: {user.answers}</Box>
                        <Box>Total questions created: {user.questionsCreated}</Box>
                      </SimpleGrid>
                    </Flex>
                    <Box>Total points: {user.total}</Box>
                  </Flex>
              </Flex>
            </Box>
        </Box>
        ))}
      </Flex>
    );
  }
}
function mapStateToProps({ users }){
  return {
    users
  }
}

export default connect(mapStateToProps)(Leaderboard);
