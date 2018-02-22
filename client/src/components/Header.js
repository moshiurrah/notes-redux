import React, {Component} from 'react';
import './style.css';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  filterColor:''
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
	  
	  return () => {
	    this.props.setColorFilter(color);
	    this.setState ({
	      filterColor:color
	    })
	  }
	}
	
	componentDidMount () {
	}
	render () {
	  return (
    	<div className="sticky-top">
    		<nav className="navbar navbar-light bg-light">
    			<a className="navbar-brand">Notes!
            {/*Buttons for filter user controls*/}
    			  {this.props.isAuth && (
            <div className="btn-group ml-2" role="group" aria-label="Button group with nested dropdown">
              <div className="btn-group" role="group">
                <button id="btnGroupDrop1" type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="fa fa-user"></i>
                </button>
                <div className="dropdown-menu">
                  <form className="px-4 py-3">
                    {this.props.displayName}
                    <button className="ml-2 btn btn-primary" onClick={this.logout}><i className="fa fa-sign-out" aria-hidden="true"></i></button>
                  </form>
                </div>
              </div>
            </div>
            )}
    			</a>
    			{this.props.isAuth && (
    				<span className="ml-auto">
  
    				  {/*Buttons for filter color controls*/}
              <div className="btn-group mr-4" role="group" aria-label="Button group with nested dropdown">
                <div className="btn-group" role="group">
                  <button id="btnGroupDrop1" style={{backgroundColor: this.state.filterColor}} type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fa fa-filter"></i>
                  </button>
                  <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <a className="dropdown-item" >
                      <button style={{backgroundColor: this.RED}}  onClick={this.changeColor(this.RED)} className='btn lblBtn mr-2'>&nbsp;&nbsp;&nbsp;</button>
                      <button style={{backgroundColor: this.YELLOW}}  onClick={this.changeColor(this.YELLOW)} className='btn lblBtn mr-2'>&nbsp;&nbsp;&nbsp;</button>
                      <button style={{backgroundColor: this.GREEN}}  onClick={this.changeColor(this.GREEN)} className='btn lblBtn mr-2'>&nbsp;&nbsp;&nbsp;</button>
                      <button onClick={this.changeColor('')} className='btn'><i class="fa fa-times"></i></button>
                    </a>
                  </div>
                </div>
              </div>
	  					<button  className="btn btn-success mr-2" id='addBtn' disabled={this.props.limReached} onClick={this.props.add}><i className="fa fa-plus" aria-hidden="true"></i></button>
    				  <button className="mr-2 btn" id='undoBtn' disabled={!this.props.hasHistory} onClick={this.undo}><i className="fa fa-undo" aria-hidden="true"></i></button>
  						<button className="btn btn-danger mr-2" id='clearBtn' onClick={this.props.clearAll}><i className="fa fa-trash-o" aria-hidden="true"></i></button>
  						
    				  {/*<button className="mr-2 btn btn-primary" onClick={this.logout}><i className="fa fa-sign-out" aria-hidden="true"></i></button>*/}
    				  
    				</span>
  				)}
    		</nav>
	    </div>
	)}
}





export default Header;