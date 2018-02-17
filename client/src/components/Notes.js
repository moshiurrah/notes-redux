/*Tanzim Mokammel
mtanzim@gmail.com
Feb 2018
*/
import React, { Component } from 'react';
//import Redux from 'redux';
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'


import logo from './logo.svg';
import './style.css';

//components
import UserLogin from './UserLogin';
import Header from './Header';
import EachNote from './EachNote';

import  noteRootReducer  from '../reducers/index';
import { logoutAndClearNotes, loginAndGetNotes } from '../actions/auth';
import { getNotesAsync, remNote, remAll } from '../actions/fetchNotes';
import {  addNoteAsync } from '../actions/addNote';
import {  delNoteAsync } from '../actions/delNote';
import {  editNoteAsync } from '../actions/editNote';

//axios progress bar
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css'
loadProgressBar();

const store = createStore(noteRootReducer, applyMiddleware(thunk));

//Redux Connect
const mapStateToProps = (state) => {
  return {
  	user: state.authReducer,
  	notes: state.notesReducer
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
  		dispatch(logoutAndClearNotes(userInfo))
  	},
  	addNote : (user, textContent) => {
  		dispatch(addNoteAsync(user, textContent))
  	},
  	editNote : (user, id,textContent, color) => {
  		dispatch(editNoteAsync(user, id,textContent, color))
  	},
  	remAll: (user) => {
  		dispatch(delNoteAsync(user,'',true))
  	},
  	remNote: (user,id) => {
  		dispatch(delNoteAsync(user,id, false))
  	}
  }
};


//React
class Board extends React.Component {
	constructor(props) {
		super(props);
		this.NUM_LIMIT=25;
		this.state = {
			curNoteID:''
		}
	}
	
	componentWillMount () {
		//loginAndGetNotes(this.props.user.user);
	}
	
	componentDidMount () {
		
	}
	componentWillUpdate () {

	}

	clearAll = () => {
		this.props.remAll(this.props.user.user);
	}

	add =  () => {
		this.setState ({
			curNoteID:''
		});
		this.props.addNote(this.props.user.user,"New Note with Redux");
	} 
	update = (id, newText, newColor) => {
		
		console.log("Note id updating is " + id);
		this.setState ({
			curNoteID:id
		});
		this.props.editNote(this.props.user.user,id,newText, newColor);
	}
	remove = (id) => {
		this.props.remNote(this.props.user.user,id);
		this.setState ({
			curNoteID:id
		});
	}

	eachNote = (note) => {
		//console.log(note);
		return (<EachNote
						key={note._id}
						id={note._id}
						curNoteID={this.state.curNoteID}
						note={note.content}
						onChange={this.update}
						onRemove={this.remove}
						fetching={this.props.notes.fetching}
						curNoteID={this.state.curNoteID}
						color={note.color}>
						</EachNote>);
	}
	

	render () {
		console.log(this.props.user);
		console.log(this.props.notes);
		return (((this.props.user.authenticated) ? this.renderNotes() : this.renderLoginPage()));
	}

	renderLoginPage = () => {
		return (
			<div>
				<Header
					isAuth={this.props.user.authenticated}
					login={this.props.loginUser}
				/>
				<UserLogin login={this.props.loginUser}
									 //getNotes={this.props.getNotes}
				/>
			</div>
		)
	}

  renderNotes = () =>  {
		return (
			<div className="">
				<Header add={this.add}
								//addDisabled={this.state.addDisabled}
								clearAll={this.clearAll}
								isAuth={this.props.user.authenticated}
								logout={this.props.logoutUser}
								user={this.props.user.user}
								needFunctions={true}
				/>
				<div className="noteContainer container">
					<div className="row ">
						{/*implement redux*/}
						{this.props.notes.notes.map(this.eachNote)}
					</div>
				</div>
			</div>
		);
  }
}



//React-Redux Connections///////////////////////////
//Connect
//Notes connected w/ Redux
const NotesContainer = connect(mapStateToProps, mapDispatchToProps)(Board);
//Provider
//Notes wraped in Provider
class Notes extends React.Component {
	// change code below this line
	render() {
		return (
			<Provider store = {store}>
				<NotesContainer/>
			</Provider>
		);
	}
};

export default Notes;