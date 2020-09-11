import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tabs, Tab, TabList, TabPanel, TabPanels, Flex } from '@chakra-ui/core';
import QuestionInfomation from './QuestionInformation';

export class Home extends Component {
  static propTypes = {
    userQuestionData: PropTypes.object.isRequired
  };
  render() {
    const { userQuestionData } = this.props;

    return (
      <Tabs align="center" isFitted backgroundColor="white">
        <TabList /* Creating the tabs for Answered/Unanswered questions  */>
          <Tab backgroundColor="white">Unanswered</Tab>
          <Tab backgroundColor="white">Answered</Tab>
        </TabList>
        <TabPanels>
          <TabPanel >
            <Flex mt="20px" flexDirection="column" alignItems="center"
            /* Mapping the answered questions to create as many components as answered questions */>
              {userQuestionData.answered.map(question => (
              <QuestionInfomation
                key={question.id}
                question_id={question.id}
                unanswered={true}
              />
              ))}
            </Flex>
          </TabPanel>
          <TabPanel>
           <Flex mt="20px" flexDirection="column" alignItems="center"
           /* Mapping the unanswered questions to create as many components as unanswered questions */>
              {userQuestionData.unanswered.map(question => (
              <QuestionInfomation
                key={question.id}
                question_id={question.id}
                unanswered={false}
              />
              ))}
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
  )
  }
}

function mapStateToProps({ loggedUser, users, questions }) {
  /* Diving the question into answered and unanswered for the logged user, by filtering every question id to match/not match user's answered id's */
  const answeredIds = Object.keys(users[loggedUser].answers);
  const answered = Object.values(questions).filter(question => 
    !answeredIds.includes(question.id)).sort((question1, question2) => 
    question2.timestamp - question1.timestamp);
  const unanswered = Object.values(questions).filter(question => 
    answeredIds.includes(question.id)).sort((question1, question2) => 
    question2.timestamp - question1.timestamp);

  return {
    userQuestionData: {
      answered,
      unanswered
    }
  };
}

export default connect(mapStateToProps)(Home);
