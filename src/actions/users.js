import { saveQuestionAnswer } from '../utils/api';
import { addAnswerToQuestion } from '../actions/questions';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER';
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}
function addAnswerToUser(loggedUser, qid, answer) {
  return {
    type: ADD_ANSWER_TO_USER,
    loggedUser,
    qid,
    answer
  };
}

export function handleSaveQuestionAnswer(loggedUser, qid, answer) {
  return dispatch => {
    dispatch(addAnswerToUser(loggedUser, qid, answer));
    dispatch(addAnswerToQuestion(loggedUser, qid, answer));

    return saveQuestionAnswer(loggedUser, qid, answer).catch(e => {
      console.warn('Error in handleSaveQuestionAnswer:', e);
    });
  };
}

export function addQuestionToUser({ id, author }) {
  return {
    type: ADD_QUESTION_TO_USER,
    id,
    author
  };
}
