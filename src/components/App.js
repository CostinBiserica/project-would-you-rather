import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { handleInitialData } from '../actions/handleInitialData'
import { connect } from 'react-redux'
import Login from './Login'
import Navigation from './Navigation'
import Home from './Home'
import  QuestionInfomation from './QuestionInformation'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import WrongID from './WrongID'
import { ThemeProvider , CSSReset, SimpleGrid } from '@chakra-ui/core'
import './Styles.css'
/* In order to style up the App, I have used the @chackra-ui library that i've found*/
class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { loggedUser } = this.props;
    return (
      <ThemeProvider /* ThemeProvider it's used because of @chackra-ui */ >
        <CSSReset/>
      <Router>
        <div className="fullpage" >
          {loggedUser === null ? ( /* Checking the authenticated user to render either the login page or the path page */
            <Route
              render={() => (
                  <Login />
              )}
            />
          ) : (
              <SimpleGrid className="full-page" columns="1" width="100%">
              <Navigation /* Added the component created the use the same navigation between pages */ />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/questions/wrong_id" component={WrongID} />
                  <Route path="/questions/:question_id" component={QuestionInfomation} />
                  <Route path="/add" component={NewQuestion} />
                  <Route path="/leaderboard" component={Leaderboard} />
                  <Route component={WrongID} />
                </Switch>
              </SimpleGrid>
          )}
        </div>
      </Router>
      </ThemeProvider>
    );
  }
}

function mapStateToProps({ loggedUser }) {
  return {
    loggedUser
  };
}

export default connect( mapStateToProps, { handleInitialData })(App);
