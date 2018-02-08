import React, {Component} from 'react';
import './style.css';
import Header from './Header';
import axios from 'axios';

class UserLogin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username:'',
			password:'',
			error:''
		}
	}
	
	/*
	handleError () {
		this.props.handleError(this.state.error);
	}
	*/
	
	handleLogIn= (event) => {
		event.preventDefault();
		this.props.login({username:this.state.username, password:this.state.password});
		
		
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
	handleChangeUser = (event) => {
		this.setState({username: event.target.value});
	}
	
	render () {
		return (

			<div className="container">
				<form  className="mt-4" onSubmit={this.handleLogIn}>
				  <div className="form-group">
				    <label htmlFor="email">Username</label>
				    <input required value={this.state.username} onChange={this.handleChangeUser} type="text" className="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Enter username"></input>
				  </div>
				  <div className="form-group">
				    <label htmlFor="password">Password</label>
				    <input required value={this.state.password} onChange={this.handleChangePass} type="password" className="form-control" name="password" id="password" placeholder="Password"></input>
				  </div>
				  <button type="submit" className="btn">Log In</button><br></br>	
				  <small> New accounts will be signed up automatically. </small>
				</form>
				<p className="mt-4">Or log in with one of the below services:</p>
				<a href={this.props.app_url+"/auth/facebook/"} target="">
				{/*<a href='#' target="">*/}
					<button className="btn">
				  	<i className="fa fa-facebook" aria-hidden="true"></i>
					</button>
				</a>
				<a href={this.props.app_url+"/auth/github/"} target="">
					<button className="ml-2 btn">
				  	<i className="fa fa-github" aria-hidden="true"></i>
					</button>
				</a>
			</div>

		);
		
	}
	
}


export default UserLogin;