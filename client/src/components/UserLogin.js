import React, {Component} from 'react';
import './style.css';
import Header from './Header';
import axios from 'axios';

import SocialLogin from './SocialLogin';
import LoginMenu from './LoginMenu';

class UserLogin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username:'',
			password:'',
			passwordVer:'',
			error:'',
			isLogin:true,
			//pseudo constants; check if this falls under best practices
			isSocial:false,
			needMenu:false,
			isLogin:true
		}
	}
	
	toggleLogin = () => {
		this.setState ({
			isLogin:true
		});
	}
	toggleSignup = () => {
		this.setState ({
			isLogin:false
		});
	} 
	
	handleLogIn= (event) => {
		event.preventDefault();
		
		if (this.state.isLogin){
			this.props.login({email:this.state.username, password:this.state.password});
			this.setState({password: ''});
		}
	}
	
	
	handleChangePass = (event) => {
		this.setState({password: event.target.value});
	}
	handleChangePassVer = (event) => {
		this.setState({passwordVer: event.target.value});
	}
	handleChangeUser = (event) => {
		this.setState({username: event.target.value});
	}
	
	render () {
		
		
		return (

			<div className="container">
				{this.state.needMenu && (<LoginMenu toggleLogin={this.toggleLogin} toggleSignup={this.toggleSignup}/>)}
				<form  className="mt-4" onSubmit={this.handleLogIn}>
				  <div className="form-group">
				    <label htmlFor="email">Username</label>
				    <input required value={this.state.username} onChange={this.handleChangeUser} type="text" className="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Enter username"></input>
				  </div>
				  <div className="form-group">
				    <label htmlFor="password">Password</label>
				    <input required value={this.state.password} onChange={this.handleChangePass} type="password" className="form-control" name="password" id="password" placeholder="Password"></input>
				    {!this.state.isLogin &&
				    (<div>
				    	<label className="mt-2" htmlFor="passwordVer">Verify Password</label>
				    	<input required value={this.state.passwordVer} onChange={this.handleChangePassVer} type="password" className="form-control" name="passwordVer" id="passwordVer" placeholder="Verify Password"></input>
			    	</div>)}
				  </div>
				  {!this.state.isLogin ?
				  	(<button type="submit" className="btn">Sign Up!</button>) :
				  	(<div>
				  		<button type="submit" className="btn">Log In!</button><br/>
				  		{!this.state.needMenu && (<small>New Accounts will be signed up automatically.</small>)}
			  		</div>)
				  }
				</form>
				{this.state.isSocial && (<SocialLogin app_url={this.props.app_url}/>)}
			</div>

		);
		
	}
	
}


export default UserLogin;