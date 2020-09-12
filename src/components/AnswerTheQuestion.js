import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { handleSaveQuestionAnswer } from '../actions/users';
import { Heading, Image, Box, Flex} from '@chakra-ui/core'
import { getIcon } from './QuestionInfo.js'
import { Form, Radio, Button } from 'semantic-ui-react'
import './Styles.css';

export class AnswerTheQuestion extends Component {
    static propTypes = {
        loggedUser: PropTypes.string.isRequired,
        question: PropTypes.object.isRequired,
        handleSaveQuestionAnswer: PropTypes.func.isRequired,
        users: PropTypes.object.isRequired
    }
    /* Setting the initial state */

    state ={
        value:''
    };
    /* When another Radio is selected, the function sets a new state for value */
    handleChange = (e, { value }) => this.setState({ value });
    
    handleSubmit = () =>{
        const { question, loggedUser, handleSaveQuestionAnswer } = this.props
        
        if(this.state.value !==''){
            /* If a radio is selected, the handleSaveQuestionAnswer will save the answer to the question and to the user */
            handleSaveQuestionAnswer(loggedUser, question.id, this.state.value)
        }
    }
    render() {
        const { question, users } = this.props;
        /* The disabled keep the button locked until the state changes, thus the user selected one option */

        /* I managed t solve the issues here, *Warning:Line 36:26:  Do not mutate state directly. Use setState()  react/no-direct-mutation-state*
        I mistakenly wrote only one "=" instead of three of them to check the this.state.value */
        const disabled = this.state.value=== '' ? true: false
        return(
            <Box width="90%" mb={8} p={5} shadow="md" borderWidth="2px" >
                <Heading as="h3" size="lg" mb="20px"> {users[question.author].name} was wondering.. would you rather..</Heading>
                <Box shadow="md" borderWidth="1px">
                <Flex >
                    <Flex ml={10} flexDirection="column" justifyContent="center" alignContent="center" >
                        <Image m={25} src={getIcon(users[question.author].avatarURL)}  size={32}/>
                    </Flex>
                    <Box m={10} borderLeft="2px" borderLeftColor="#D3D3D3" shadow="md" />
                    <Flex width="80%" flexDirection="column" justifyContent="center" alignItems="center">
                        <Form  /* The form to get the user's answer */
                            onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <Radio
                                    label={question.optionOne.text}
                                    name="radioGroup"
                                    value="optionOne"
                                    checked={this.state.value === 'optionOne'}
                                    onChange={this.handleChange}
                                />
                                <Radio
                                    label={question.optionTwo.text}
                                    name="radioGroup"
                                    value="optionTwo"
                                    checked={this.state.value === 'optionTwo'}
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Button 
                                className="login-button"
                                fluid
                                positive
                                disabled={disabled}
                                content="Submit"
                                />
                            </Form.Field>
                        </Form>
                    </Flex>
                </Flex>
                </Box>
            </Box>
        )
  }
}

  function mapStateToProps( {loggedUser, users} ){
      return {
          loggedUser,
          users
      }
  }
  export default connect(mapStateToProps, { handleSaveQuestionAnswer })(AnswerTheQuestion)