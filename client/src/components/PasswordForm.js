/*Tanzim Mokammel
mtanzim@gmail.com
Nov 2017
*/
import React, {Component} from 'react';
import './style.css';
//import axios from 'axios';

import { connect } from 'react-redux';

import { changePassAsync } from '../actions/changePass';
import {logoutAndClearNotesAndClearPast} from '../actions/auth';

import ErrorFooter from './ErrorFooter';

const mapStateToProps = (state) => {
  return {
  	user: state.authReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  	changePass: (user,oldPass,newPass) => {
  		return dispatch(changePassAsync(user,oldPass,newPass));
  	},
  	logout: (user) => {
  		dispatch (logoutAndClearNotesAndClearPast(user));
  	}
  }
};

class PasswordFormBase extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  curPass:'',
		  newPass:'',
		  newPassVerify:'',
		  localErr:'',
		  isDisabled:false,
		  opacity:1
		}
	}
	
	handleChangeCurPass = (event) => {
		this.setState({curPass: event.target.value});
	}
	handleChangeNewPass = (event) => {
		this.setState({newPass: event.target.value});
	}
	handleChangeNewPassVerify = (event) => {
		this.setState({newPassVerify: event.target.value});
	}	
	
	handleSavePass = (event) => {
	  event.preventDefault();
	  if (this.state.newPass !== this.state.newPassVerify) {
	    this.setState({localErr:"New passwords don't match!!"});
	  } else {
	  	this.setState ({isDisabled:true, opacity:0.3});
	  	this.props.changePass(this.props.user.user._id,this.state.curPass, this.state.newPass)
  		.then(()=>{
  			setTimeout( () => {
  				return this.props.logout(this.props.user.user._id);
  			}, 1500);
  		})
  		.catch( (err) => {
  			console.log (err);
  			this.setState ({isDisabled:false, opacity:1});
  		});	
	  }
	}
	
	render () {
		return (
			<div style={{opacity:this.state.opacity}}>
				<form className="ml-3 mr-3" onSubmit={this.handleSavePass}>
				  <div className="form-group">
				    <label htmlFor="curPass">Current Password</label>
				    <input required value={this.state.curPass} onChange={this.handleChangeCurPass} type="password" className="form-control" name="curPass" id="curPass" placeholder="Enter Current Password"></input>
				  </div>
				  <div className="form-group">
				    <label htmlFor="newPass">New Password</label>
				    <input required value={this.state.newPass} onChange={this.handleChangeNewPass} type="password" className="form-control" name="newPass" id="newPass" placeholder="Enter New Password"></input>
				  </div>
				  <div className="form-group">
				    <label htmlFor="newPassVerify">Confirm New Password</label>
				    <input required value={this.state.newPassVerify} onChange={this.handleChangeNewPassVerify} type="password" className="form-control" name="newPassVerify" id="newPassVerify" placeholder="Enter New Password Again"></input>
				  </div>
				  <button disabled={this.state.isDisabled} type="submit" className="btn mb-2">Save</button><br></br>	
				</form>
				<ErrorFooter errMsg={this.state.localErr}/>
			</div>
		)
	}
}
const PasswordForm = connect(mapStateToProps, mapDispatchToProps)(PasswordFormBase);
export default PasswordForm;