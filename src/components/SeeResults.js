import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getIcon } from './QuestionInfo.js'
import {  Heading, Image, SimpleGrid, Box, Text, Flex, Button, Badge} from '@chakra-ui/core'


export class SeeResults extends Component {
    static propTypes = {
        question: PropTypes.object.isRequired,
        users: PropTypes.object.isRequired,
        loggedUser: PropTypes.string.isRequired,
        history: PropTypes.object.isRequired
    }

    handleClick = () => {
        this.props.history.push('/');
      }
     
    
render() {
    const { loggedUser, users, question } = this.props
    const user = users[loggedUser]
    /* Getting from the props the information seeded to show the results*/
    const firstOptionVotes = question.optionOne.votes.length
    const secondOptionVotes = question.optionTwo.votes.length
    const totalVotes= firstOptionVotes+secondOptionVotes
    const userOption= user.answers[question.id]

    return(
        /* Creating the layout for the results page */

        <Box width="60%" mb={8} p={5} shadow="md" borderWidth="2px" >
            <Heading size="md" mb={5}>Results: {totalVotes} votes</Heading>
            <Box width="100%" mb={8} p={5} shadow="md" borderWidth="2px" >
                <Heading as="h3" size="md" mb="20px">{users[question.author].name} asked if you would you rather..</Heading>
                <Box >
                <Flex >
                    <Flex ml={10} flexDirection="column" justifyContent="center" alignContent="center" >
                        <Image  src={getIcon(users[question.author].avatarURL)} size={32}/>
                    </Flex>
                    <Box m={10} borderLeft="2px" borderLeftColor="#D3D3D3" shadow="md" />
                    <Flex flexDirection="column" width="70%" alignItems="center" justifyContent="center">
                        <SimpleGrid width="80%" mt={15} columns={2} spacing={15}>
                                <Box 
                                        borderWidth="1px" 
                                        rounded="lg" 
                                        textAlign="center" 
                                        width="100"  >{question.optionOne.text}
                                </Box>
                                <Box 
                                        borderWidth="1px" 
                                        rounded="lg" 
                                        textAlign="center">{question.optionTwo.text}
                                </Box>
                                <Box 
                                        borderWidth="1px" 
                                        rounded="lg" 
                                        textAlign="center" 
                                        width="100" >
                                        <Text mt={3}>{firstOptionVotes} votes ({firstOptionVotes/totalVotes*100}% of votes)</Text>
                                        {userOption === 'optionOne' && 
                                        <Badge m={3}variant="solid" variantColor="green">Your Vote!</Badge>}
                                </Box>
                                <Box 
                                        borderWidth="1px" 
                                        rounded="lg" 
                                        textAlign="center" >
                                        <Text mt={3}>{secondOptionVotes} votes ({secondOptionVotes/totalVotes*100}% of votes)</Text>
                                        {userOption === 'optionTwo' && 
                                        <Badge m={3} variant="solid" variantColor="green">Your Vote!</Badge>}
                                </Box>
                        </SimpleGrid>
                        </Flex>
                </Flex>
                </Box>
                <Box mt={15} width ="100%" textAlign="end">
                    <Button  onClick={this.handleClick}>Back</Button>
                </Box>
            </Box>
        </Box>
    )
}

}

function mapStateToProps({ users, loggedUser }){
    return {
        users,
        loggedUser
    }
}
export default withRouter(connect(mapStateToProps)(SeeResults))