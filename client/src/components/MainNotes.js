import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Notes from './Notes'
import LoginPage from './LoginPage'
import UserProfile from './UserProfile'

import { Provider } from 'react-redux'
import noteRootReducer from '../reducers/index';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const MainNotesContainer = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Notes} />
      <Route path='/login' component={LoginPage} />
      <Route path='/user' component={UserProfile} />
    </Switch>
  </main>
)


const store = createStore(noteRootReducer, applyMiddleware(thunk));
//Provider
//Notes wraped in Provider
class MainNotes extends React.Component {
  // change code below this line
  render() {
    return (
      <Provider store={store}>
        <MainNotesContainer />
      </Provider>
    );
  }
};

export default MainNotes;