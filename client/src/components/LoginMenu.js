import React, { Component } from 'react';
import './style.css';

const LoginMenu = ({ toggleLogin, toggleSignup }) => {
	return (
		<div>
			<ul className="nav nav-tabs mt-2 mb-2">
				<li className="nav-item">
					<a className="nav-link" onClick={toggleLogin}>Login</a>
				</li>
				<li className="nav-item">
					<a className="nav-link" onClick={toggleSignup} >Sign Up</a>
				</li>
			</ul>
		</div>
	)
}

export default LoginMenu;