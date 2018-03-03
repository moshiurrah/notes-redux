import React, {Component} from 'react';
import ColorPalette from './ColorPalette';
import {COLORS} from './constants.js'
import './style.css';

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { logoutAndClearNotesAndClearPast } from '../actions/auth';
import {  setColorFilter } from '../actions/changeColor';

//Redux Connect
const mapStateToProps = (state) => {
  return {
  	user: state.authReducer,
  	colorFilter: state.colorReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  	logoutUser: (userInfo) => {
  		dispatch(logoutAndClearNotesAndClearPast(userInfo))
  	},
  	setColorFilter: (colorHex) => {
  		dispatch(setColorFilter(colorHex));
  	}
  }
};

class HeaderBase extends React.Component {
	constructor(props) {
		super(props);
		const defState = {
		  filterColor:''
		}
		this.state = defState;

	}
	logout = () => {
	  //this.props.logout(this.props.user);
	  this.props.logoutUser(this.props.user.user._id);
	}
	changeColor = (color) => {
	  
	  return () => {
	    this.props.setColorFilter(color);
	    this.setState ({
	      filterColor:color
	    })
	  }
	}
  renderBackButton = () => {
    return (
    	<Link to='/'>
    		<button type="button" className="btn ml-4"><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
  		</Link>
	  )
  }
  renderFilter = () => {
    return (
      <div  className="btn-group  ml-2" role="group" aria-label="Button group with nested dropdown">
        <div className="btn-group" role="group">
          <button id="btnGroupDrop1" style={{backgroundColor: this.props.colorFilter}} type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fa fa-filter"></i>
          </button>
          <div className="dropdown-menu"  aria-labelledby="btnGroupDrop1">
              {COLORS.map((color, index) => {
                return (
                  <div className="dropdown-item" >
                    <ColorPalette color={color} key={index} onClick={this.changeColor}/>
                  </div>
                )
              })}
            <div className="dropdown-item" >
              <a onClick={this.changeColor('')}>Clear</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
  renderUserMenu = () => {
    return (
      <div className="btn-group ml-2" role="group" aria-label="Button group with nested dropdown">
        <div className="btn-group" role="group">
          <button id="btnGroupDrop1" type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fa fa-user"></i>
          </button>
          <div  className="dropdown-menu">
            <form className="">
              <Link to='/user'>
                <div className='ml-2 mr-2 userName'><p>{this.props.user.user.displayName.name}</p></div>
              </Link>
              <button className="ml-2 mr-2 btn btn-primary" onClick={this.logout}><i className="fa fa-sign-out" aria-hidden="true"></i></button>
            </form>
          </div>
        </div>
      </div>
    )
  }
	render () {
	  return (
      <div className="sticky-top mb-2">
    		<nav className="navbar navbar-light bg-light">
    			<div className="navbar-brand">Notes!
    				<span className="ml-4">
    				  {this.props.isBackReq && this.renderBackButton()}
              {this.props.isFilterReq && this.renderFilter()}
              {this.props.isUserReq && this.renderUserMenu()}
    				</span>
    			</div>
    			
    		</nav>
	    </div>
	)}
}


const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderBase);
export default Header;