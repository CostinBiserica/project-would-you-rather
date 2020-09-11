import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Heading, Box, Text, Flex, Spinner } from '@chakra-ui/core'
import { Form } from 'semantic-ui-react';
import { handleSaveQuestion } from '../actions/questions';

export class NewQuestion extends Component {
  static propTypes = {
    loggedUser: PropTypes.string.isRequired,
    handleSaveQuestion: PropTypes.func.isRequired
  }
/* Setting the initial state */
  state = {
    validSubmit: false,
    isLoading: false,
    optionOne: '',
    optionTwo: ''
  }

  handleSubmit = e => {
    e.preventDefault();
    const { loggedUser, handleSaveQuestion } = this.props;
    const { optionOne, optionTwo } = this.state;
/* Creates a new Promise that eventually saves the question. isLoading keeps the Spinner on to offer the user a good experience */
    new Promise((res) => {
      this.setState({ isLoading: true });
      handleSaveQuestion(optionOne, optionTwo, loggedUser);
      setTimeout(() => res('success'), 1000);
    }).then(() => {
      this.setState({
        optionOne: '',
        optionTwo: ''
      });
      this.setState({ validSubmit: true });
    });
  }
/* On input change, the state gets uupdated with the value from the input */
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    /* The disabled keeps the submit locked until both of the inputs until the users completes both */
    const disabled = this.state.optionOne === '' || this.state.optionTwo === '';
    /* When the question is created, the app redirects to "/" */
    if (this.state.validSubmit === true) {
      return <Redirect to="/" />;
    }
    return (
      <Flex mt={15} flexDirection="row" justifyContent="center" alignItems="center">
        <Box width="40%" mb={8} p={5} shadow="md" borderWidth="2px" textAlign="center">
            <Heading as="h3" size="lg" mb="20px"  >Add a new question</Heading>
            <Box padding={10} shadow="l" borderWidth="2px" borderRadius="5px">
              <Text  fontSize="2xl" as="i">Would you rather ..</Text>
              <Box m={5}>
                <Form  onSubmit={this.handleSubmit}>
                    <Form.Input
                      id="optionOne"
                      placeholder="     Enter option one..."
                      value={this.state.optionOne}
                      onChange={this.handleChange}
                      required
                    />
                    <Text>Or..</Text>
                    <Form.Input
                      id="optionTwo"
                      placeholder="     Enter option two..."
                      value={this.state.optionTwo}
                      onChange={this.handleChange}
                      required
                    />
                    <Form.Button 
                        className="login-button"
                        fluid
                        positive
                        disabled={disabled}
                        content="Submit"
                    >
                      Submit
                    </Form.Button>
                  </Form>
                  {this.state.isLoading &&
                      <Box>
                        <Text mb={15}>Adding the question..</Text>
                        <Spinner size="xl"></Spinner>
                      </Box>
                  }
                </Box>
            </Box>
        </Box>
      </Flex>
    );
  }
}

function mapStateToProps({ loggedUser }) {
  return {
    loggedUser
  };
}

export default connect(mapStateToProps, { handleSaveQuestion })(NewQuestion);
