import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import{ Image, Button, Flex, Box, Text } from '@chakra-ui/core'
import { setLoggedUser } from '../actions/loggedUser';
import "./Styles.css"
/* Defining the navigation bar component with the needed buttons */
class Navigation extends Component {
  handleLogout = e => {
    e.preventDefault();
    this.props.setLoggedUser(null);
    window.location.reload()
  };

  render() {
    const { loggedUser, users } = this.props;
    return (
    <Flex
      bg="#c5e2f5"
      w="100%"
      px={5}
      py={4}
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex justifyContent="flex-start" alignItems="center">
        <Box /* Buttons to Route the page to Home, To the New question page or to the The Scoreboard */>
          <Button borderRadius="15px" >
              <Link name="home"  exact="true" to="/">Home</Link>
          </Button>
          <Button margin="4px" borderRadius="15px" >
              <Link name="new question"  to="/add"> New Question</Link>
          </Button>
          <Button borderRadius="15px" >
              <Link  name="leader board"  to="/leaderboard"> Scoreboard</Link>
          </Button>
        </Box>
      </Flex>
      <Flex justifyContent="flex-end" alignItems="center">
        <Text pl={3} color="black">Today you fight for justice as {users[loggedUser].name}</Text>
        <Image
          marginLeft="10px"
          src={users[loggedUser].avatarURL}
          size={30}
        />
        <Text pl={3} color="black">
          Let's answer some questions to save the human kind!
        </Text>
        <Button rightIcon='external-link' marginLeft="15px" borderRadius="15px" onClick={this.handleLogout} 
        >
        Logout
          </Button>
      </Flex>
    </Flex>
    );
  }
}

function mapStateToProps({ users, loggedUser }) {
  return {
    loggedUser,
    users
  };
}

export default connect(
  mapStateToProps,
  { setLoggedUser }
)(Navigation);
