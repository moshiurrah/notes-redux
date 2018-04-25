import React, { Component } from 'react'
import { connect } from 'react-redux'
import './style.css';


import UserLogin from './UserLogin';
import Header from './Header';
import ErrorFooter from './ErrorFooter';

const mapStateToProps = (state) => {
	return {
		user: state.authReducer,
	}
};

const LoginBase = ({ user }) => {
	return (
		<div>
			<Header
				key={0}
				id={0}
				isControlReq={false}
			/>
			<UserLogin />
			<ErrorFooter errMsg={user.err} />
		</div>
	)
}

const LoginPage = connect(mapStateToProps, null)(LoginBase);
export default LoginPage;