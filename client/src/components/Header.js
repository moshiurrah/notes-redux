import React, {Component} from 'react';
import './style.css';


class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
	  };
	  
		this.RED = '#FF8A80';
		this.YELLOW = '#FFEE58';
		this.GREEN = '#00E676';
		
	}
	
	logout = () => {
	  this.props.logout(this.props.user);
	}
	
	undo = () => {
	  this.props.undo(this.props.user);
	}
	
	changeColor = (color) => {
	  return () => this.props.setColorFilter(color);
	}
	
	componentDidMount () {
	}
	render () {
	  return (
    	<div className="sticky-top">
    		<nav className="navbar navbar-light bg-light">
    			<a className="navbar-brand" href="#">Notes!</a>
    			{this.props.isAuth && (
    				<span className="ml-auto">
    				  <button className="mr-2 btn btn-primary" onClick={this.logout}><i className="fa fa-sign-out" aria-hidden="true"></i></button>
    				  
              <div className="btn-group mr-2" role="group" aria-label="Button group with nested dropdown">
                <div className="btn-group" role="group">
                  <button id="btnGroupDrop1" type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Filter
                  </button>
                  <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <a className="dropdown-item" ><button style={{backgroundColor: this.RED}}  onClick={this.changeColor(this.RED)} className='btn'></button></a>
                    <a className="dropdown-item" ><button style={{backgroundColor: this.YELLOW}}  onClick={this.changeColor(this.YELLOW)} className='btn'></button></a>
                    <a className="dropdown-item" ><button style={{backgroundColor: this.GREEN}}  onClick={this.changeColor(this.GREEN)} className='btn'></button></a>
                    <a className="dropdown-item" ><button onClick={this.changeColor('')} className='btn'>Clear</button></a>
                  </div>
                </div>
              </div>
    				  
				  
  						<button  className="btn btn-success mr-2" id='addBtn' disabled={this.props.limReached} onClick={this.props.add}><i className="fa fa-plus" aria-hidden="true"></i></button>
  						<button className="btn btn-danger mr-2" id='clearBtn' onClick={this.props.clearAll}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
  						<button className="btn" id='undoBtn' disabled={!this.props.hasHistory} onClick={this.undo}><i className="fa fa-undo" aria-hidden="true"></i></button>
    				</span>
  				)}
    		</nav>
	    </div>
	)}
}





export default Header;