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
import LoginPage from './LoginPage';
//import UserLogin from './UserLogin';
import Header from './Header';
import EachNote from './EachNote';
import NewNote from './NewNote';
import ErrorFooter from './ErrorFooter';
import ControlFooter from './ControlFooter';

import  noteRootReducer  from '../reducers/index';
import { logoutAndClearNotesAndClearPast, loginAndGetNotes } from '../actions/auth';
import { getNotesAsync } from '../actions/fetchNotes';
import {  addNoteAsync } from '../actions/addNote';
import {  delNoteAsync } from '../actions/delNote';
import {  editNoteAsync } from '../actions/editNote';
import {  undoAsync } from '../actions/undo';
import {  setColorFilter } from '../actions/changeColor';

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
  	hasHistory:state.notesReducer.hasHistory,
  	limReached:state.notesReducer.undoState.present.limReached,
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
  	addNote : (user, textContent, color, toggleAdd) => {
  		dispatch(addNoteAsync(user, textContent, color, toggleAdd))
  	},
  	editNote : (user, id,textContent, color) => {
  		dispatch(editNoteAsync(user, id,textContent, color))
  	},
  	remAll: (user) => {
  		dispatch(delNoteAsync(user,'',true))
  	},
  	remNote: (user,id) => {
  		dispatch(delNoteAsync(user,id, false))
  	},
  	undo: (user) => {
  		dispatch(undoAsync(user))
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
			curNoteID:'',
			needFocus:false,
			adding:false
		}
	}
	
	componentWillMount () {
		//loginAndGetNotes(this.props.user.user._id);
	}
	
	componentDidMount () {
		
	}
	componentWillUpdate () {
		
	}

	clearAll = () => {
		this.setState ({
			curNoteID:''
		});
		this.props.remAll(this.props.user.user._id);
	}
	
	toggleAdd = () => {
		this.setState({
			adding:!this.state.adding
		})
	}

	add =  (text, color) => {
		this.setState ({
			curNoteID:'',
			needFocus:true
		});
		//clear filter when adding!
		this.props.setColorFilter('');
		this.props.addNote(this.props.user.user._id,text, color, this.toggleAdd);
		//this.toggleAdd();
	} 
	update = (id, newText, newColor) => {
		
		console.log("Note id updating is " + id);
		this.setState ({
			curNoteID:id,
			needFocus:false
		});
		this.props.editNote(this.props.user.user._id,id,newText, newColor);
	}
	remove = (id) => {
		this.props.remNote(this.props.user.user._id,id);
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
						lastNoteID={this.props.notes.lastNoteID}
						needFocus={this.state.needFocus}
						note={note.content}
						onChange={this.update}
						onRemove={this.remove}
						fetching={this.props.notes.fetching}
						color={note.color}
						colorFilter={this.props.colorFilter}>
						</EachNote>);
	}
	

	render () {
		console.log(this.props.user);
		console.log(this.props.notes);
		console.log(this.props.colorFilter);
		return (((this.props.user.authenticated) ? this.renderNotes() : this.renderLoginPage()));
	}

	renderLoginPage = () => {
		return (<LoginPage/>);
		
		/*
		return (
			<div>
				<Header
					isAuth={this.props.user.authenticated}
					login={this.props.loginUser}
					
				/>
				<UserLogin login={this.props.loginUser}
									 //getNotes={this.props.getNotes}
				/>
				<ErrorFooter errMsg={this.props.user.err}/>
			</div>
		)
		*/
	}

  renderNotes = () =>  {
		return (
			<div className="">
				<ControlFooter add={this.toggleAdd}
								//addDisabled={this.state.addDisabled}
								user={this.props.user.user._id}
								clearAll={this.clearAll}
								isAuth={this.props.user.authenticated}
								logout={this.props.logoutUser}
								undo={this.props.undo}
								hasHistory={this.props.hasHistory}
								limReached={this.props.limReached}/>
				<Header 
								//addDisabled={this.state.addDisabled}
								clearAll={this.clearAll}
								isAuth={this.props.user.authenticated}
								logout={this.props.logoutUser}
								user={this.props.user.user._id}
								displayName={this.props.user.user.displayName.name}
								needFunctions={true}
								undo={this.props.undo}
								hasHistory={this.props.hasHistory}
								limReached={this.props.limReached}
								setColorFilter={this.props.setColorFilter}
								filterColor={this.props.colorFilter}/>
				<div className="noteContainer container">
					<div className="row ">
						{this.state.adding && (<NewNote fetching={this.props.notes.fetching}
																						add={this.add}
																						toggleAdd={this.toggleAdd}/>)}
						{this.props.colorFilter !== '' ?
							(this.props.notes.notes.filter(note => note.color === this.props.colorFilter).map(this.eachNote)) :
							(this.props.notes.notes.map(this.eachNote))
						}
					</div>
				</div>
				<ErrorFooter errMsg={this.props.notes.err}/>
			</div>
		);
  }
}



//React-Redux Connections///////////////////////////
//Connect
//Notes connected w/ Redux
const Notes = connect(mapStateToProps, mapDispatchToProps)(Board);
//Provider
//Notes wraped in Provider
/*
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
*/

export default Notes;