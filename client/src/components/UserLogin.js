import React, { Component } from 'react';
//import { Link } from 'react-router-dom'

import './style.css';

import SocialLogin from './SocialLogin';
import LoginMenu from './LoginMenu';
import ErrorFooter from './ErrorFooter';

import { connect } from 'react-redux'
import './style.css';

import { Redirect } from 'react-router-dom'

//redirecting w/ react router lessons here
//https://stackoverflow.com/questions/43230194/how-to-use-redirect-in-the-new-react-router-dom-of-reactjs

import { loginAndGetNotes } from '../actions/auth';
//import { getNotesAsync } from '../actions/fetchNotes';

const mapStateToProps = (state) => {
  return {
    curUser: state.authReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (userInfo, isLogin) => {
      return dispatch(loginAndGetNotes(userInfo, isLogin))
    }
  }
};

class UserLoginBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.curUser.user.email || '',
      password: '',
      passwordVer: '',
      errMsg: '',
      isRedirect: false,
      //pseudo constants; check if this falls under best practices
      isSocial: false,
      needMenu: true,
      isLogin: this.props.curUser.isLogin //toggles between signup and login
    }
  }

  toggleLogin = () => {
    this.setState({
      isLogin: true
    });
  }
  toggleSignup = () => {
    this.setState({
      isLogin: false
    });
  }


  completeLogin = () => {
    this.props.loginUser({ email: this.state.username, password: this.state.password }, this.state.isLogin)
      .then(() => this.setState({ isRedirect: true }))
      .catch((err) => {
        console.log(err);
      });
    this.setState({ password: '' });
  }

  handleLogIn = (event) => {
    event.preventDefault();

    if (this.state.isLogin) {
      this.completeLogin();
      /*
      this.props.loginUser({email:this.state.username, password:this.state.password}, this.state.isLogin)
      .then (() => this.setState({ isRedirect: true }))
      .catch ( (err) => {
        console.log(err);
      });
      this.setState({password: ''});
      */
    } else {
      if (this.state.password !== this.state.passwordVer) {
        this.setState({ errMsg: "Passwords don't match!" });
      } else {
        this.setState({ errMsg: "" });
        console.log('Signing up!!!');
        this.completeLogin();
      }
    }
  }


  handleChangePass = (event) => {
    this.setState({ password: event.target.value });
  }
  handleChangePassVer = (event) => {
    this.setState({ passwordVer: event.target.value });
  }
  handleChangeUser = (event) => {
    this.setState({ username: event.target.value });
  }

  render() {

    //console.log(this.state.isLogin);
    //console.log(this.props.curUser);

    if (this.state.isRedirect) {
      return <Redirect to='/' />;
    }

    return (
      <div className="container">
        {this.state.needMenu && (<LoginMenu toggleLogin={this.toggleLogin} toggleSignup={this.toggleSignup} />)}
        <form className="mt-4" onSubmit={this.handleLogIn}>
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
            (<button type="submit" className="btn btn-primary">Sign Up!</button>) :
            (<div>
              <button type="submit" className="btn btn-success">Log In!</button><br />
              {!this.state.needMenu && (<small>New Accounts will be signed up automatically.</small>)}
            </div>)
          }
        </form>
        {this.state.isSocial && (<SocialLogin app_url={this.props.app_url} />)}
        <ErrorFooter errMsg={this.state.errMsg} />
      </div>

    );

  }

}

const UserLogin = connect(mapStateToProps, mapDispatchToProps)(UserLoginBase);

export default UserLogin;