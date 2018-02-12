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
import { loginUserAsync, logoutUser } from '../actions/auth';
import { getNotesAsync, addNote, remNote, editNote, remAll } from '../actions/modNote';

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
  		dispatch(loginUserAsync(userInfo))
  	},
  	getNotes: (userInfo) => {
  		dispatch(getNotesAsync(userInfo))
  	},
  	logoutUser: (userInfo) => {
  		dispatch(logoutUser(userInfo))
  	},
  	addNote : (textContent) => {
  		dispatch(addNote(textContent))
  	},
  	editNote : (id,textContent) => {
  		dispatch(editNote(id,textContent))
  	},
  	remAll: (id) => {
  		dispatch(remAll())
  	},
  	remNote: (id) => {
  		dispatch(remNote(id))
  	}
  }
};


//React
class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//isAuth: true,
			userInfo: {},
			note: [{id:(new Date).getTime(), 
							note:'Welcome to the Bulletin Board! On desktop, Hover on the note to access the controls.'
						}],
			numNotes:1,
			addDisabled:false,
		};

		this.NUM_LIMIT=25;
		this.update = this.update.bind(this);
		this.remove = this.remove.bind(this);
		this.eachNote = this.eachNote.bind(this);
		this.add = this.add.bind(this);
		this.clearAll = this.clearAll.bind(this);
		this.changeColor = this.changeColor.bind(this);
	}
	componentWillMount () {
		//alert('Board loading');
		//console.log(this.props.isAuth);
		if(this.props.user.authenticated) {
			console.log(this.props.user);
			this.props.getNotes(this.props.user);
		}
	}
	componentDidMount () {
		
	}
	componentWillUpdate () {

	}

	clearAll() {
		this.props.remAll();
		/*
		this.setState({
			note:[],
			numNotes: 0,
			addDisabled:false,
			maxZ:0
		});
		*/
	}

	add () {
		//use time as the id as a hack for now
		//this will also serve as the default color picker
		console.log('number of notes: ' + this.state.numNotes);

		if (this.state.numNotes < this.NUM_LIMIT) {
			/*var notesUpdated = this.state.note.concat([{id:(new Date).getTime()}]);*/
			//var notesUpdated = [{id:(new Date).getTime()}].concat(this.state.note);
			//console.log(this.state.note);
			
			
			this.props.addNote("New Note with Redux");
			/*
			this.setState({
				note:notesUpdated,
				numNotes: this.state.numNotes +=1,
				addDisabled: this.state.numNotes >= this.NUM_LIMIT
			});
			*/
		}

	} 
	changeColor (color, id) {
		console.log('changing to color: ' + color)
		var notesUpdated = this.state.note.map(
			note => (note.id !== id) ?
				note :
				{...note,
					color:color} 
			)
		this.setState({
			note:notesUpdated
		});
		console.log(this.state.note);
	}
	update (newText,id) {
		//console.log('updateing' + id + 'with '+newText);
		this.props.editNote(id,newText);
		/*
		console.log(newText+ ' for '+id);
		var notesUpdated = this.state.note.map(
			note => (note.id !== id) ?
				note :
				{...note,
					note:newText} 
			)
		this.setState({
			note:notesUpdated
		});
		//console.log(notesUpdated);
		console.log(this.state.note);
		*/
	}
	remove (id) {
		
		this.props.remNote(id);
		
		/*
		var notesUpdated = this.state.note.filter((note) => (note.id !== id));
		this.setState({
			note:notesUpdated,
			numNotes: this.state.numNotes -=1,
			addDisabled: this.state.numNotes > this.NUM_LIMIT
		});	
		console.log ('state is: '+ this.state.addDisabled)
		*/
	}

	eachNote(note){
		//console.log(note);
		return (<EachNote
						key={note.id}
						id={note.id}
						note={note.content}
						onChange={this.update}
						onRemove={this.remove}
						onColorChange={this.changeColor}>
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
									 getNotes={this.props.getNotes}
				/>
			</div>
		)
	}

  renderNotes = () =>  {
		return (
			<div className="">
				<Header add={this.add}
								addDisabled={this.state.addDisabled}
								clearAll={this.clearAll}
								isAuth={this.props.user.authenticated}
								logout={this.props.logoutUser}
								needFunctions={true}
				/>
				<div className="fixed-bottom" hidden={!this.state.addDisabled}>
					<div className="alert alert-danger" >
						More than {this.NUM_LIMIT} notes are not allowed!
					</div>
				</div>
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