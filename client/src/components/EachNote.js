import React, { Component } from 'react';
import './style.css';

//import CircularProgressbar from 'react-circular-progressbar';
//import 'react-circular-progressbar/dist/styles.css';


class EachNote extends React.Component {
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
			editing: false,
			newTextContent: this.props.note,
		};
	}

	
	componentWillMount () {
	}
	componentDidMount () {
		/*
		if (this.props.id === this.props.lastNoteID && this.props.needFocus){
			this.setState({editing:true})
		}
		*/
	}
	componentDidUpdate() {
	}

	edit = () => {
		//console.log("note prop is:" + this.props.note);
		this.setState ({
			editing:true,
			newTextContent: this.props.note
		});
		//console.log("state is:" + this.state.newTextContent);
	}
	remove = () => {
		this.props.onRemove(this.props.id);
	}
	save =  () => {
		this.props.onChange(this.props.id, this.state.newTextContent, this.props.color);
		this.setState ({
			editing:false,
		});
	}
	cancel =  () => {
		this.setState ({
			editing:false,
		});
	}
	
	//an inner function can be returned to prevent execution, which will cause infinite loop in react!
	//see the following link:
	//https://stackoverflow.com/questions/33412703/how-to-pass-parameters-to-callback-function-without-executing-it
	
	changeColor = (colorHex) => {
		return () => this.props.onChange(this.props.id, this.props.note, colorHex);
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
		    <div className='card note' style={{backgroundColor: this.props.color,height: this.NoteHeight+'px'}}>
		    	<div className='card-body'>
		    		{/**/}
		    		<textarea autoFocus onFocus={this.handleFocus} ref='newText' style={{'height':this.formHeight+'px'}} onChange={this.handleChangeNoteText}>{this.state.newTextContent}</textarea>
	    		</div>
		    	<div className="card-footer bg-transparent">
	    			<div className="row">
			    		<div className="ml-auto">
			    			<button className="btn btn-danger " onClick={this.cancel}><i className="fa fa-times" aria-hidden="true"></i></button>
								<button className='btn btn-success' onClick={this.save}><i className="fa fa-floppy-o" aria-hidden="true"></i></button>
			    		</div>
		    		</div>
	    		</div>
    		</div>
  		</div>
		);
	}
	renderDisplay = () => {
    return (
  		<div className={this.SIZECLASS}>
		    <div className='card note' style={{backgroundColor: this.props.color,height: this.NoteHeight+'px'}}>
		    	<div onClick={this.edit} className='card-body'>
			    	<p>{this.props.note}</p>
		    	</div>
		    	<span>
			    	<div className="card-footer ">
			    		<div id="noteCtrl" className="row">
				    		<button style={{backgroundColor: this.RED}} id="red" className="btn lblBtn" onClick={this.changeColor(this.RED)}></button>
				    		<button style={{backgroundColor: this.YELLOW}} id="yellow" className="btn lblBtn"  onClick={this.changeColor(this.YELLOW)}></button>
				    		<button style={{backgroundColor: this.GREEN}} id="green" className="btn lblBtn" onClick={this.changeColor(this.GREEN)}></button>
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
	
	renderLoading = () => {
    return (
  		<div style={{opacity:0.3}} className={this.SIZECLASS}>
		    <div className='card note' style={{backgroundColor: this.props.color,height: this.NoteHeight+'px'}}>
		    	<div className='card-body'>
		    		<p>{this.state.newTextContent}</p>
		    	</div>
		    </div>
	    </div>
    );
	}
	
  render() {
		return (((this.state.editing) ? this.renderForm() : ( this.props.curNoteID === this.props.id && this.props.fetching ? this.renderLoading() : this.renderDisplay() )));
  }
};

export default EachNote;
