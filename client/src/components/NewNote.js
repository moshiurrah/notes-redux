import React, { Component}  from 'react';
import './style.css';

//import CircularProgressbar from 'react-circular-progressbar';
//import 'react-circular-progressbar/dist/styles.css';
import {COLORS, NOTEHEIGHT,  FORMHEIGHT, SIZECLASS} from './constants.js';
import ColorPalette from './ColorPalette';

class NewNote extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			color: COLORS[0],
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
			color: COLORS[0],
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
			<div className={SIZECLASS}>
		    <div className='card note' style={{backgroundColor: this.state.color,height: NOTEHEIGHT+'px'}}>
		    	<div className='card-body'>
		    		{/**/}
		    		<textarea autoFocus onFocus={this.handleFocus} style={{'height':FORMHEIGHT+'px'}} onChange={this.handleChangeNoteText}>{this.state.newTextContent}</textarea>
	    		</div>
		    	<div className="card-footer bg-transparent">
		    		<div id="noteCtrl" className="row">
							{COLORS.map((color, index) => {
                return (<ColorPalette color={color} key={index} onClick={this.changeColor}/>);
              })}
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
			<div style={{opacity:0.3}} className={SIZECLASS}>
		    <div className='card note' style={{backgroundColor: this.state.color,height: NOTEHEIGHT+'px'}}>
		    	<div className='card-body'>
		    		{/**/}
		    		<textarea style={{'height':FORMHEIGHT+'px'}} >{this.state.newTextContent}</textarea>
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
