import React, {Component} from 'react';
import './style.css';


class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
	  };
	}
	
	logout = () => {
	  this.props.logout(this.props.user);
	}
	
	undo = () => {
	  this.props.undo(this.props.user);
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