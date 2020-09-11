import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Flex } from '@chakra-ui/core'
import './Styles.css';
import { QuestionInfo, getIcon } from './QuestionInfo'
import  AnswerTheQuestion from  './AnswerTheQuestion.js'
import  SeeTheResults from './SeeResults.js'

/* I have created constants to be sure not to make a mistake when typing */
const unansweredQuestion= ' UNASWERED_QUESTION'
const questionResults= 'QUESTION_RESULTS'

/* I have created the component to display the questions, in 3 different modes ( answered question, unaswered questions and the results) */
const QuestionInfomation = (props) => {
  const history = useHistory();
  const handleAnswered = () =>{
    history.push(`/questions/${props.question_id}`)
  }

  const handleUnanswered = () =>{
     history.push(`/questions/${props.question_id}`)
  }

  if (props.notAQuestion === true) {
    return <Redirect to="/questions/wrong_id" />;
  }
  /* We return the AnswerTheQuestion component if the typeOfInfo it's set to unansweredQuestion*/

  if(props.typeOfInfo === unansweredQuestion){
    return(
      <Flex mt="20px" flexDirection="column" alignItems="center">
        <AnswerTheQuestion
           question = {props.question}
        />
      </Flex>
          )
  }
/* We return the SeeTheResults component if the typeOfInfo it's set to questionResults*/
  if(props.typeOfInfo === questionResults){
    return (
      <Flex mt="20px" flexDirection="column" alignItems="center">
        <SeeTheResults
            question = {props.question}
        />
      </Flex>)
  }

  return (
    <QuestionInfo
      title={props.author.name}
      image={getIcon(props.author.avatarURL)}
      optionOne={props.question.optionOne.text}
      optionTwo={props.question.optionTwo.text+"?"}
      button={props.unanswered ? handleUnanswered : handleAnswered}
      button_text={props.unanswered ? "Answer this question" : "See the results for this question"}
    />
  );
}
/* Defining the Proptypes */

QuestionInfomation.propTypes = {
  question: PropTypes.object,
  author: PropTypes.object,
  unanswered: PropTypes.bool,
  question_id: PropTypes.string
};

function mapStateToProps({ users, questions, loggedUser } , { match, question_id }) {
  let question, author, typeOfInfo, notAQuestion = false;
  if (question_id !== undefined) {
    question = questions[question_id];
    author = users[question.author];
  } else {
    const { question_id } = match.params;
    question = questions[question_id];
    const user = users[loggedUser];
    if (question === undefined) {
      notAQuestion = true;
    } else {
      author = users[question.author];
      typeOfInfo = unansweredQuestion;
      if (Object.keys(user.answers).includes(question.id)) {
        typeOfInfo = questionResults;
      }
    }
  }
  return {
    question,
    author,
    typeOfInfo,
    notAQuestion
  };
}

export default connect(mapStateToProps)(QuestionInfomation);
