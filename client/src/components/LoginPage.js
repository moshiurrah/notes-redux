import React, {Component} from 'react';
import { Provider, connect } from 'react-redux'
import './style.css';


import {loginAndGetNotes } from '../actions/auth';

import UserLogin from './UserLogin';
import Header from './Header';
import ErrorFooter from './ErrorFooter';

const mapStateToProps = (state) => {
  return {
  	user: state.authReducer,
  }
};

/*
const mapDispatchToProps = (dispatch) => {
  return {
  	loginUser: (userInfo) => {	
  		dispatch(loginAndGetNotes(userInfo))
  	}
  }
};
*/


const LoginBase = ({user, loginUser}) => {
  return (
			<div>
			<Header
				isAuth={user.authenticated}
			/>
			<UserLogin 
									//login={loginUser}
								 //getNotes={this.props.getNotes}
			/>
			<ErrorFooter errMsg={user.err}/>
		</div>
  )
}

//const LoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginBase);
const LoginPage = connect(mapStateToProps, null)(LoginBase);
export default LoginPage;