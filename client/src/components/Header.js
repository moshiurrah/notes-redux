import React, {Component} from 'react';
import ColorPalette from './ColorPalette';
import {COLORS} from './constants.js'
import './style.css';

import { Link } from 'react-router-dom'

class Header extends React.Component {
	constructor(props) {
		super(props);
		const defState = {
		  filterColor:''
		}
		this.state = defState;

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
    			<div className="navbar-brand">Notes!
            {this.props.isAuth && (
      				<span className="ml-4">

      				  {/*Buttons for filter color controls*/}
                <div  className="btn-group  ml-2" role="group" aria-label="Button group with nested dropdown">
                  <div className="btn-group" role="group">
                    <button id="btnGroupDrop1" style={{backgroundColor: this.props.filterColor}} type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fa fa-filter"></i>
                    </button>
                    <div className="dropdown-menu"  aria-labelledby="btnGroupDrop1">
                      <div className="dropdown-item" >
                        {COLORS.map((color, index) => {
                          return (<ColorPalette color={color} key={index} onClick={this.changeColor}/>)
                        })}
                        <button onClick={this.changeColor('')} className='btn'><i className="fa fa-times"></i></button>
                      </div>
                    </div>
                  </div>
                </div>
      				  {/*<button className="mr-2 btn btn-primary" onClick={this.logout}><i className="fa fa-sign-out" aria-hidden="true"></i></button>*/}
      				 {/*Buttons for filter user controls*/}
                <div className="btn-group ml-2" role="group" aria-label="Button group with nested dropdown">
                  <div className="btn-group" role="group">
                    <button id="btnGroupDrop1" type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fa fa-user"></i>
                    </button>
                    <div  className="dropdown-menu">
                      <form className="">
                        <Link to='/user'>
                          <p className='ml-2 mr-2'>{this.props.displayName}</p>
                        </Link>
                        <button className="ml-2 mr-2 btn btn-primary" onClick={this.logout}><i className="fa fa-sign-out" aria-hidden="true"></i></button>
                      </form>
                    </div>
                  </div>
                </div>
      				</span>
  				  )}
    			
    			</div>
    			
    		</nav>
	    </div>
	)}
}





export default Header;