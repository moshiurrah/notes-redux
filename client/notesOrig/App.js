/*Tanzim Mokammel
mtanzim@gmail.com
Nov 2017
*/

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		return (
			<div>
				<Board/>
			</div>

		)
	}

}


class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			note: [{id:(new Date).getTime(), 
							note:'Welcome to the Bulletin Board! On desktop, Hover on the note to access the controls.'
						}],
			numNotes:1,
			addDisabled:false,
			maxZ:0
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
		$(".alert").alert();
	}

	
	componentWillUpdate () {
		
	}
	

	

	clearAll() {
		this.setState({
			note:[],
			numNotes: 0,
			addDisabled:false,
			maxZ:0
		});
	}

	changeZ () {
		this.setState ({
			maxZ: this.state.maxZ +1
		});
	}
	add () {
		//use time as the id as a hack for now
		//this will also serve as the default color picker

		console.log('number of notes: ' + this.state.numNotes);

		if (this.state.numNotes < this.NUM_LIMIT) {
			/*var notesUpdated = this.state.note.concat([{id:(new Date).getTime()}]);*/
			var notesUpdated = [{id:(new Date).getTime()}].concat(this.state.note);
			console.log(this.state.note);
			
			this.setState({
				note:notesUpdated,
				numNotes: this.state.numNotes +=1,
				addDisabled: this.state.numNotes >= this.NUM_LIMIT

			});
		}
			//alert('too many notes!');
			//this.setState({
				//addDisabled:true
			//});
			//alert('More than ' + this.NUM_LIMIT + ' notes are not allowed!');
		//
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
	}
	remove (id) {
		var notesUpdated = this.state.note.filter((note) => (note.id !== id));
		this.setState({
			note:notesUpdated,
			numNotes: this.state.numNotes -=1,
			addDisabled: this.state.numNotes > this.NUM_LIMIT
		});
		console.log ('state is: '+ this.state.addDisabled)
	}

	eachNote(note){

		//console.log(note.id);
		//console.log(note.note);
		return (<Note
						key={note.id}
						id={note.id}
						note={note.note}
						onChange={this.update}
						onRemove={this.remove}
						//color={note.color}
						onColorChange={this.changeColor}
						>
						{/*note.note*/}
						</Note>);
	}

  render() {
    // change code below this line
		return (
			<div className="">
				<div className="sticky-top">
					<nav className="navbar navbar-light bg-light">
						<a className="navbar-brand" href="#">Bulletin Board</a>
							<span className="ml-auto">
									<button  className="btn btn-default mr-2" id='addBtn' disabled={this.state.addDisabled} onClick={this.add}><i className="fa fa-plus" aria-hidden="true"></i></button>
									<button className="btn btn-default" id='clearBtn' onClick={this.clearAll}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
							</span>
					</nav>
				</div>
				<div className="fixed-bottom" hidden={!this.state.addDisabled}>
					<div className="alert alert-danger" >
						More than {this.NUM_LIMIT} notes are not allowed!
					</div>
				</div>
				<div className="noteContainer container">
					<div className="row ">
						{this.state.note.map(this.eachNote)}
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
		this.randomBetween = this.randomBetween.bind(this);
		this.changeRed = this.changeRed.bind(this);
		this.changeGreen = this.changeGreen.bind(this);
		this.changeYellow = this.changeYellow.bind(this);

		//this.renderBreak = this.renderBreak.bind(this);

	}
	randomBetween() {
		var bodyWidth = document.body.clientWidth-this.NoteWidth;
  	var bodyHeight = document.body.clientHeight-this.NoteHeight;
  	var xOffset=0.10*bodyWidth;
  	var yOffset=0.10*bodyHeight;

  	console.log('body height is ' +bodyHeight);
  	var randPosX = xOffset+ Math.floor((Math.random()*bodyWidth));
  	var randPosY = yOffset+ Math.floor((Math.random()*bodyHeight));
  	console.log({'x':randPosX,'y':randPosY});
  	return {'x':randPosX,'y':randPosY};	
	}
	
	componentWillMount () {

			this.setState({
				styleState:{
					//left: this.randomBetween().x+'px',
          //top: this.randomBetween().y+'px',
          backgroundColor: '#FFEE58',
          height: this.NoteHeight+'px',
          //width: this.NoteWidth+'px' 
				}
				
			})
	}

	/*
	componentWillUpdate () {
		this.setState ({
			styleState: {...this.state.styleState, zIndex:this.props.maxZ}
		});
	}
	*/
	
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

	/*
	renderBreak () {
		this.state.numNotes % 3 === 0 ? return (<div className="w-100"></div>) : null
	}
	*/

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
		//	return (<ReactDraggable>{((this.state.editing) ? this.renderForm() : this.renderDisplay())}</ReactDraggable>);
		return (((this.state.editing) ? this.renderForm() : this.renderDisplay()));
  }
};

Note.defaultProps = {
	note: 'New Note'
}


ReactDOM.render(<App/>, document.getElementById('react-container'));