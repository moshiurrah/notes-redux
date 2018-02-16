import React, { Component } from 'react';
import './style.css';

class EachNote extends React.Component {
	constructor(props) {
		super(props);


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
		
		this.state = {
			editing: false,
			textContent:this.props.note,
			styleState:{
        backgroundColor: this.props.color,
        height: this.NoteHeight+'px',
			}
		};

	}

	
	componentWillMount () {
		//console.log(this.props.color);
		/*
		this.setState({
			styleState:{
        backgroundColor: this.props.color,
        height: this.NoteHeight+'px',
			}
		})
		*/
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
		this.props.onChange(this.props.id, this.refs.newText.value, this.props.color);
		this.setState ({
			editing:false 
		});
		
		
	}
	changeRed () {
		this.props.onChange(this.props.id, 'this.refs.newText.value', '#FF8A80');
		/*
		this.setState ({
			styleState: {...this.state.styleState, backgroundColor:'#FF8A80'}
		});
		*/
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
		    <div className='card note' style={{backgroundColor: this.props.color,height: this.NoteHeight+'px'}}>
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
				    <div className='card note' style={{backgroundColor: this.props.color,height: this.NoteHeight+'px'}}>
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

export default EachNote;
