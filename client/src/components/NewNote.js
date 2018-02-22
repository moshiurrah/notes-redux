import React, { Component } from 'react';
import './style.css';

//import CircularProgressbar from 'react-circular-progressbar';
//import 'react-circular-progressbar/dist/styles.css';


class NewNote extends React.Component {
	constructor(props) {
		super(props);

		//style constants
		this.NoteHeight=300;
		this.NoteWidth=300;
		this.formHeight=this.NoteHeight*0.6;
		
		this.RED = '#FF8A80';
		this.YELLOW = '#FFEE58';
		this.GREEN = '#00E676';
		
		this.SIZECLASS='col-sm-6 col-md-6 col-lg-4';

		this.state = {
			color: this.YELLOW,
			newTextContent: ''
		};
	}

	
	componentWillMount () {
	}
	componentDidMount () {

	}
	componentDidUpdate() {
	}


	save =  () => {
		this.props.add(this.state.newTextContent, this.state.color);
		
	}
	
	cancel = () => {
		this.setState ({
			color: this.YELLOW,
			newTextContent: ''
		})
		this.props.toggleAdd();
	}
	
	//an inner function can be returned to prevent execution, which will cause infinite loop in react!
	//see the following link:
	//https://stackoverflow.com/questions/33412703/how-to-pass-parameters-to-callback-function-without-executing-it
	
	changeColor = (colorHex) => {
		return () => {this.setState ({
			color:colorHex
		})}
	}
	
	handleChangeNoteText = (event) => {
		this.setState({newTextContent: event.target.value});
	}
	
	handleFocus = (event) => {
		event.target.select();
	}

	renderForm = () => {
		return(
			<div className={this.SIZECLASS}>
		    <div className='card note' style={{backgroundColor: this.state.color,height: this.NoteHeight+'px'}}>
		    	<div className='card-body'>
		    		{/**/}
		    		<textarea autoFocus onFocus={this.handleFocus} style={{'height':this.formHeight+'px'}} onChange={this.handleChangeNoteText}>{this.state.newTextContent}</textarea>
	    		</div>
		    	<div className="card-footer bg-transparent">
		    		<div id="noteCtrl" className="row">
			    		<button style={{backgroundColor: this.RED}} id="red" className="btn lblBtn" onClick={this.changeColor(this.RED)}></button>
			    		<button style={{backgroundColor: this.YELLOW}} id="yellow" className="btn lblBtn"  onClick={this.changeColor(this.YELLOW)}></button>
			    		<button style={{backgroundColor: this.GREEN}} id="green" className="btn lblBtn" onClick={this.changeColor(this.GREEN)}></button>
			    		<div className="ml-auto">
			    			<button className="btn btn-danger " onClick={this.cancel}><i className="fa fa-times" aria-hidden="true"></i></button>
				    		<button className="btn btn-success " onClick={this.save}><i className="fa fa-floppy-o" aria-hidden="true"></i></button>
			    		</div>
		    		</div>
	    		</div>
    		</div>
  		</div>
		);
	}
	
	
	renderLoading = () => {
		return(
			<div style={{opacity:0.3}} className={this.SIZECLASS}>
		    <div className='card note' style={{backgroundColor: this.state.color,height: this.NoteHeight+'px'}}>
		    	<div className='card-body'>
		    		{/**/}
		    		<textarea style={{'height':this.formHeight+'px'}} >{this.state.newTextContent}</textarea>
	    		</div>
    		</div>
  		</div>
		);
	}
	
  render() {
		return !this.props.fetching ? this.renderForm() : this.renderLoading();
  }
};

export default NewNote;
