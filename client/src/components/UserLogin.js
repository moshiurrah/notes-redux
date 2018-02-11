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
			isSocial:false,
			isLogin:true
		}
	}
	
	/*
	handleError () {
		this.props.handleError(this.state.error);
	}
	*/
	
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
			this.props.login({username:this.state.username, password:this.state.password});
		}
		
		
		//console.log(this.state);
		/*
		axios({
		  method: 'post',
		  url: '/signup',
		  data: {
		    email: this.state.email,
		    password: this.state.password
		  }
		}).then (res => {
			console.log(res.data.content);
			this.setState({email:'',password:''});
			//this.setUserID(res.data.content.toString());
			window.location = '/';
		  //return res;
		}).catch (err =>{
			//console.log(err.response.data);
			this.setState({password:'', error:err.response.data.error});
			this.handleError();
		});
		*/
		
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
				<LoginMenu toggleLogin={this.toggleLogin} toggleSignup={this.toggleSignup}/>
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
				  	(<button type="submit" className="btn">Log In!</button>)
				  }
				</form>
				{this.state.isSocial && (<SocialLogin app_url={this.props.app_url}/>)}
			</div>

		);
		
	}
	
}


export default UserLogin;