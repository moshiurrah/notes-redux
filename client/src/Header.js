import React, {Component} from 'react';
import './style.css';


class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
	  };
	}
	render () {
	  return (
    	<div className="sticky-top">
    		<nav className="navbar navbar-light bg-light">
    			<a className="navbar-brand" href="#">Bulletin Board</a>
    			{this.props.needFunctions && (
    				<span className="ml-auto">
    				  <button className="mr-2 btn btn-primary"><i className="fa fa-sign-out" aria-hidden="true"></i></button>
  						<button  className="btn btn-success mr-2" id='addBtn' disabled={this.props.addDisabled} onClick={this.props.add}><i className="fa fa-plus" aria-hidden="true"></i></button>
  						<button className="btn btn-danger" id='clearBtn' onClick={this.props.clearAll}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
    				</span>
  				)}
    		</nav>
	    </div>
	)}
}


export default Header;