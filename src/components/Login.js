import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {  Image, Heading, SimpleGrid, Box} from '@chakra-ui/core';
import { Form } from 'semantic-ui-react'
import { setLoggedUser } from '../actions/loggedUser';
//import { Form } from 'semantic-ui-react';
import './Styles.css';

export class Login extends Component {
  state = {
    loading: false
  };

  handleLoading = () => {
    this.setState({ loading: true });
  };
  render() {
    return (
      <div className="login-screen">
    <Fragment>
        <SimpleGrid columns={1} spacing={5}>
          <Box className="box-shadow"> 
            <PageTitle/>
          </Box>
          <Box>
          <Image borderRadius="50px" src="/avatars/Avengers.png" size="small" centered />
          </Box>
          <Box>
            <ConnectedLoginForm onLoading ={this.handleLoading}
            />
          </Box>
          </SimpleGrid>
      </Fragment>
      </div>
    );
  }
}

const PageTitle = () => (
<div style={{textAlign:"center" }}>
  <Heading as="h3">
    Welcome to the Would You Rather App! Avengers Edition
  </Heading>
  <br/>
  <span text-align="center">
    Please sign in to continue
  </span>
</div>
)


class LoginForm extends Component {
  static propTypes = {
    onLoading: PropTypes.func.isRequired
  };

  state = {
    value: '',
    chosen_character: '/avatars/avengers-icon.png',
    selectedCharacter: ''
  };

  onChange = event => {
    const {users} = this.props
    users.map(user => {
      if(user.name===event.target.value){ /* I solved the *Warning: Expected to return a value at the end of arrow function array-callback-return*, 
        I didn't had a return for the case in which user.name===event.target.value was false */
      return  this.setState({...this.state, 
                            chosen_character: user.avatarURL, 
                            value: user.id,
                            selectedCharacter: event.target.value })
        // this.setState({value: user.id})
        // this.setState({selectedCharacter: event.target.value})
      }
      return null
    })
    
  };
  handleSubmit = e => {
    e.preventDefault();
    const { onLoading, setLoggedUser } = this.props;
    const loggedUser = this.state.value;
    new Promise((res, rej) => {
      onLoading();
      setTimeout(() => res(), 500);
    }).then(() => setLoggedUser(loggedUser));
  };
  
  listTheCharacters = () => {
    const { users } = this.props;
    return users.map(user => ({
      key: user.id,
      text: user.name,
      value: user.id,
      image: 
      { 
              avatar: true, 
              src: user.avatarURL 
      }
    }));
  };

  render() {
    const { value, chosen_character, selectedCharacter } = this.state;
    const disabled = value === '' ? true : false;
    
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <span className="choose-login">
            Choose which Avengers character you want to login as today!
          </span>
          <select className="select-option" 
                  value={selectedCharacter}
                  onChange={this.onChange} 
                  placeholder="Select a character!"  >
                    <option disabled={!disabled} >Select a character!</option>
            {this.listTheCharacters().map((user) => 
            <option className="select-option" key={user.key} >
                  {user.text}
              </option>)}
          </select>
        
        <Form.Button className="login-button" onClick={this.onLoginClick} content="Login" positive disabled={disabled} fluid />
        </Form>
        <div className="character-photo">
          <Image  src={chosen_character} />
        </div> 
      </div>
    );
  }
}

export const ConnectedLoginForm = connect(
  mapStateToProps,
  { setLoggedUser }
)(LoginForm);

function mapStateToProps({ users }) {
  return {
    users: Object.values(users)
  };
}

export default Login;
