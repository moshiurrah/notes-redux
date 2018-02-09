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

import  noteRootReducer  from '../reducers/index';
import { loginUser, logoutUser } from '../actions/auth';
import { addNote, remNote, editNote, remAll } from '../actions/modNote';

const store = createStore(noteRootReducer);

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
  		dispatch(loginUser(userInfo))
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
	}
	componentDidMount () {
	}
	componentWillUpdate () {
		//console.log(this.props.isAuth);
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
		return (<Note
						key={note.id}
						id={note.id}
						note={note.content}
						onChange={this.update}
						onRemove={this.remove}
						onColorChange={this.changeColor}>
						</Note>);
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
				<UserLogin login={this.props.loginUser}/>
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
						{this.props.notes.map(this.eachNote)}
					</div>
				</div>
			</div>
		);
  }
}

class Note extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editing: false,
			textContent:this.props.note
		};

		this.NoteHeight=300;
		this.NoteWidth=300;
		this.formHeight=this.NoteHeight*0.6;

		this.edit = this.edit.bind(this);
		this.remove = this.remove.bind(this);
		this.renderDisplay = this.renderDisplay.bind(this);
		this.renderForm = this.renderForm.bind(this);
		this.save = this.save.bind(this);
		this.changeRed = this.changeRed.bind(this);
		this.changeGreen = this.changeGreen.bind(this);
		this.changeYellow = this.changeYellow.bind(this);

	}

	
	componentWillMount () {

			this.setState({
				styleState:{
          backgroundColor: '#FFEE58',
          height: this.NoteHeight+'px',
				}
				
			})
	}

	componentDidMount () {
		/*
		this.setState({
			editing:true
		})
		*/
	}
	componentDidUpdate() {
		if (this.state.editing){
			this.refs.newText.focus();
			this.refs.newText.select();
		}
	}

	edit () {
		this.setState ({
			editing:true,
			textContent:''
		});
	}
	remove() {
		//alert("Removing Note");
		this.props.onRemove(this.props.id);
	}
	save () {
		//var val = this.refs.newText.value;
		//alert(val);
		this.props.onChange(this.refs.newText.value, this.props.id);
		this.setState ({
			editing:false 
		});
		
		
	}
	changeRed () {
		this.setState ({
			styleState: {...this.state.styleState, backgroundColor:'#FF8A80'}
		});
	}
	changeYellow () {
		this.setState ({
			styleState: {...this.state.styleState, backgroundColor:'#FFEE58'}
		});
	}
	changeGreen () {
		this.setState ({
			styleState: {...this.state.styleState, backgroundColor:'#00E676'}
		});
	}

	renderForm () {
		return(
			<div className='col-sm-6 col-md-4 col-lg-3'>
		    <div className='card note' style={this.state.styleState}>
		    	<div className='card-body'>
		    		{/**/}
		    		<textarea style={{'height':this.formHeight+'px'}} ref='newText'>{this.props.note}</textarea>
	    		</div>
		    	<div className="card-footer bg-transparent">
	    			<div className="row">
			    		<div className="ml-auto">
								<button className='btn btn-success' onClick={this.save}><i className="fa fa-floppy-o" aria-hidden="true"></i></button>
			    		</div>
		    		</div>
	    		</div>
    		</div>
  		</div>
		);

	}
	renderDisplay () {
    return (
	    		<div className='col-sm-6 col-md-4 col-lg-3'>
				    <div className='card note' style={this.state.styleState}>
				    	<div onClick={this.edit} className='card-body'>
					    	<p>{this.props.note}</p>
				    	</div>
				    	<span>
					    	<div className="card-footer ">
					    		<div id="noteCtrl" className="row">
						    		<button id="red" className="btn lblBtn" onClick={this.changeRed}></button>
						    		<button id="yellow" className="btn lblBtn"  onClick={this.changeYellow}></button>
						    		<button id="green" className="btn lblBtn" onClick={this.changeGreen}></button>
						    		<div className="ml-auto">
							    		<button className="btn btn-success " onClick={this.edit}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
							    		<button className="btn btn-danger " onClick={this.remove}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
						    		</div>
					    		</div>
				    		</div>
			    		</span>
				    </div>
			    </div>
    );
	}
  render() {
		return (((this.state.editing) ? this.renderForm() : this.renderDisplay()));
  }
};


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
	// change code above this line
};

export default Notes;