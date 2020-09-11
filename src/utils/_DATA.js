let users = {
  blackPanther: {
    id: 'blackPanther',
    name: 'Black Panther',
    avatarURL: '/avatars/blackPanther.png',
    answers: {
      'i8ipw9r4eqs7w1e8kpfas': 'optionTwo',
      '4yj6kprkgcvg2y0gykw67u': 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  captainAmerica: {
    id: 'captainAmerica',
    name: 'Captain America',
    avatarURL: '/avatars/captainAmerica.png',
    answers: {
      'i8ipw9r4eqs7w1e8kpfas': 'optionTwo',
      'vyzv95qo6zol664nvsi7mo': 'optionOne'
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do']
  },
  hulk: {
    id: 'hulk',
    name: 'Hulk',
    avatarURL: '/avatars/hulk.png',
    answers: {},
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r']
  },
  spiderMan: {
    id: 'spiderMan',
    name: 'SpiderMan',
    avatarURL: '/avatars/spiderMan.png',
    answers: {
      'n3svxdk7jmaedn2k3chrgr': 'optionOne'
    },
    questions: []
  },
  ironMan: {
    id: 'ironMan',
    name: 'IronMan',
    avatarURL: '/avatars/ironMan.png',
    answers: {
      'n3svxdk7jmaedn2k3chrgr': 'optionTwo'
    },
    questions: []
  },
  thor: {
    id: 'thor',
    name: 'Thor',
    avatarURL: '/avatars/thor.png',
    answers: {
      'vyzv95qo6zol664nvsi7mo': 'optionTwo',
      '0gn8gx43nbslag0a8mrlefp': 'optionTwo',
      '2q9pf65lg34wub1fni9vos': 'optionOne'
    },
    questions: []
  }
};

let questions = {
  'n3svxdk7jmaedn2k3chrgr': {
    id: 'n3svxdk7jmaedn2k3chrgr',
    author: 'hulk',
    timestamp: 1599642195576,
    optionOne: {
      votes: ['spiderMan'],
      text: 'be like Hulk'
    },
    optionTwo: {
      votes: ['ironMan'],
      text: 'be like IronMan'
    }
  },
  'i8ipw9r4eqs7w1e8kpfas': {
    id: 'i8ipw9r4eqs7w1e8kpfas',
    author: 'captainAmerica',
    timestamp: 1599642367698,
    optionOne: {
      votes: [],
      text: "have Captain America's shield"
    },
    optionTwo: {
      votes: ['captainAmerica', 'blackPanther'],
      text: "SpiderMan's senses"
    }
  },
  'vyzv95qo6zol664nvsi7mo':{
    id:'vyzv95qo6zol664nvsi7mo',
    author: "hulk",
    timestamp: 1599642492989, 
    optionOne: {
      votes: ['captainAmerica'], 
      text: "fly with IronMan"
    },
    optionTwo: {
      votes: ['thor'],  
      text: "jump over buildings with Hulk"}
  },
  '0gn8gx43nbslag0a8mrlefp':{
    id: "0gn8gx43nbslag0a8mrlefp",
    author: "thor",
    timestamp: 1599642679026,
    optionOne: {
      votes: [], 
      text: "be an Asgardian God"
    },
    optionTwo: {
      votes: ['thor'],  
      text: "be like Thor"}
  },
  '2q9pf65lg34wub1fni9vos':{
    id: "2q9pf65lg34wub1fni9vos",
    author: "hulk",
    optionOne: {
      votes: ['thor'],
      text: "be mighty"
    },
    optionTwo: {
      votes: [],
      text: "be Thor"
    },
    timestamp: 1599642808930
  },
  '4yj6kprkgcvg2y0gykw67u':{
    id: "4yj6kprkgcvg2y0gykw67u",
    author: "blackPanther",
    timestamp: 1599643018282,
    optionOne: {
      votes: [],
      text: "be made of iron"
    },
    optionTwo: {
      votes: ['blackPanther'],
      text: "have a vibranium suit"
    }
  }
};


function generateUID() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

export function _getUsers() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...users }), 1000);
  });
}

export function _getQuestions() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...questions }), 1000);
  });
}

function formatQuestion({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText
    },
    optionTwo: {
      votes: [],
      text: optionTwoText
    }
  };
}

export function _saveQuestion(question) {
  return new Promise((res, rej) => {
    const loggedUser = question.author;
    const formattedQuestion = formatQuestion(question);

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      };

      users = {
        ...users,
        [loggedUser]: {
          ...users[loggedUser],
          questions: users[loggedUser].questions.concat([formattedQuestion.id])
        }
      };

      res(formattedQuestion);
    }, 1000);
  });
}

export function _saveQuestionAnswer({ loggedUser, qid, answer }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        [loggedUser]: {
          ...users[loggedUser],
          answers: {
            ...users[loggedUser].answers,
            [qid]: answer
          }
        }
      };

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([loggedUser])
          }
        }
      };

      res();
    }, 500);
  });
}
