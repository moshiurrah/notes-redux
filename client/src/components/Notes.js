/*Tanzim Mokammel
mtanzim@gmail.com
Feb 2018
*/
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


import logo from './logo.svg';
import './style.css';

//components
//import UserLogin from './UserLogin';
import Header from './Header';
import EachNote from './EachNote';
import NewNote from './NewNote';
import ErrorFooter from './ErrorFooter';
import ControlFooter from './ControlFooter';

//import  noteRootReducer  from '../reducers/index';
import { logoutAndClearNotesAndClearPast, loginAndGetNotes } from '../actions/auth';
import { getNotesAsync } from '../actions/fetchNotes';
import { addNoteAsync } from '../actions/addNote';
import { delNoteAsync } from '../actions/delNote';
import { editNoteAsync } from '../actions/editNote';
import { undoAsync, redoAsync } from '../actions/undo';
import { setColorFilter } from '../actions/changeColor';

import { LOADINGOPACITY } from './constants.js';

//axios progress bar
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css'
loadProgressBar();

//const store = createStore(noteRootReducer, applyMiddleware(thunk));

//Redux Connect
const mapStateToProps = (state) => {
  return {
    user: state.authReducer,
    notes: state.notesReducer.undoState.present,
    notesFuture: state.notesReducer.undoState.future,
    notesPast: state.notesReducer.undoState.past,
    hasHistory: state.notesReducer.hasHistory,
    hasFuture: state.notesReducer.hasFuture,
    limReached: state.notesReducer.undoState.present.limReached,
    colorFilter: state.colorReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (userInfo) => {
      dispatch(loginAndGetNotes(userInfo))
    },
    getNotes: (userInfo) => {
      dispatch(getNotesAsync(userInfo))
    },
    logoutUser: (userInfo) => {
      dispatch(logoutAndClearNotesAndClearPast(userInfo))
    },
    //is this under best practices, or am I too smart :|
    addNote: (user, textContent, color, toggleAdd) => {
      dispatch(addNoteAsync(user, textContent, color, toggleAdd))
    },
    editNote: (user, id, textContent, color) => {
      dispatch(editNoteAsync(user, id, textContent, color))
    },
    remAll: (user) => {
      return dispatch(delNoteAsync(user, '', true));
    },
    remNote: (user, id) => {
      dispatch(delNoteAsync(user, id, false))
    },
    undo: (user) => {
      return dispatch(undoAsync(user));
    },
    redo: (user) => {
      return dispatch(redoAsync(user));
    },
    setColorFilter: (colorHex) => {
      dispatch(setColorFilter(colorHex));
    }
  }
};


//React
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curNoteID: '',
      fadeAll: false,
      boardOpacity: 1,
      needFocus: false,
      adding: false
    }
  }

  componentWillMount() {
    //this.props.getNotes(this.props.user.user._id);
  }

  componentDidMount() {

  }
  componentWillUpdate() {

  }

  toggleFade = () => {
    if (this.state.fadeAll) {
      this.setState({
        boardOpacity: LOADINGOPACITY
      })
    } else {
      this.setState({
        boardOpacity: 1
      })
    }
    this.setState({
      fadeAll: !this.state.fadeAll
    });
  }

  clearAll = () => {
    this.toggleFade();
    this.setState({
      curNoteID: ''
    });
    this.props.remAll(this.props.user.user._id)
      .then(() => this.toggleFade());
  }
  undo = () => {
    this.toggleFade();
    this.setState({
      curNoteID: ''
    });
    this.props.undo(this.props.user.user._id)
      .then(() => this.toggleFade());
  }

  redo = () => {
    this.toggleFade();
    this.setState({
      curNoteID: ''
    });
    this.props.redo(this.props.user.user._id)
      .then(() => this.toggleFade());
  }

  toggleAdd = () => {
    this.setState({
      adding: !this.state.adding
    })
  }

  add = (text, color) => {
    this.setState({
      curNoteID: '',
      needFocus: true
    });
    //clear filter when adding!
    this.props.setColorFilter('');
    this.props.addNote(this.props.user.user._id, text, color, this.toggleAdd);
    //this.toggleAdd();
  }
  update = (id, newText, newColor) => {

    //console.log("Note id updating is " + id);
    this.setState({
      curNoteID: id,
      needFocus: false
    });
    this.props.editNote(this.props.user.user._id, id, newText, newColor);
  }
  remove = (id) => {
    this.props.remNote(this.props.user.user._id, id);
    this.setState({
      curNoteID: id
    });
  }

  eachNote = (note) => {
    //console.log(note);
    return (<EachNote
      key={note._id}
      id={note._id}
      curNoteID={this.state.curNoteID}
      lastNoteID={this.props.notes.lastNoteID}
      needFocus={this.state.needFocus}
      note={note.content}
      onChange={this.update}
      onRemove={this.remove}
      fetching={this.props.notes.fetching}
      fadeAll={this.state.fadeAll}
      color={note.color}
      colorFilter={this.props.colorFilter}>
    </EachNote>);
  }


  render() {
    //console.log(this.props.user);
    //console.log(this.props.notesPast);
    //console.log(this.props.notes);
    //console.log(this.props.notesFuture);
    //console.log(this.props.colorFilter);
    //console.log(this.state.fadeAll);
    return (((this.props.user.authenticated) ? this.renderNotes() : this.renderLoginPage()));
  }

  renderLoginPage = () => {
    return <Redirect to='/login' />;
  }

  renderNoteContainer = () => {
    return (
      <div className="row">
        {this.state.adding && (<NewNote fetching={this.props.notes.fetching}
          add={this.add}
          toggleAdd={this.toggleAdd} />)}
        {this.props.colorFilter !== '' ?
          (this.props.notes.notes.filter(note => note.color === this.props.colorFilter).map(this.eachNote)) :
          (this.props.notes.notes.map(this.eachNote))
        }
      </div>
    )
  }

  renderNotes = () => {
    return (
      <div className="">
        <Header key={1} id={1} isFilterReq={true} isUserReq={true} />
        <ControlFooter add={this.toggleAdd}
          //addDisabled={this.state.addDisabled}
          user={this.props.user.user._id}
          clearAll={this.clearAll}
          isAuth={this.props.user.authenticated}
          logout={this.props.logoutUser}
          undo={this.undo}
          redo={this.redo}
          hasHistory={this.props.hasHistory}
          hasFuture={this.props.hasFuture}
          limReached={this.props.limReached} />
        <ErrorFooter errMsg={this.props.notes.err} />

        <div className="noteContainer container">
          {this.renderNoteContainer()}
        </div>

      </div>
    );
  }
}

//Notes connected w/ Redux
const Notes = connect(mapStateToProps, mapDispatchToProps)(Board);
export default Notes;