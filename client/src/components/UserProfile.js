/*Tanzim Mokammel
mtanzim@gmail.com
Nov 2017
*/
import React, { Component } from 'react';
import './style.css';
import PasswordForm from './PasswordForm';
import Header from './Header';
import ErrorFooter from './ErrorFooter';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import { deleteAccountAsync } from '../actions/delAccount';
import { clearPast } from '../actions/undo';
//clearAuthStat
import { clearAuthStat } from '../actions/delAccount';

const mapStateToProps = (state) => {
	return {
		user: state.authReducer,
		notes: state.notesReducer.undoState.present
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		deleteAccount: (user, oldPass, newPass) => {
			return dispatch(deleteAccountAsync(user, oldPass, newPass));
		},
		clearHistory: () => {
			dispatch(clearPast());
		},
		clearStatus: () => {
			dispatch(clearAuthStat());
		}
	}
};

class UserProfileBase extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			changePassToggle: false,
			changeDeleteToggle: false,
			accountDeleted: false
		}
	}
	componentDidMount() {
		////console.log(this.props.userInfo);
	}
	showPassForm = () => {
		this.setState({
			changePassToggle: !this.state.changePassToggle
		})
	}
	showDelTog = () => {
		this.setState({
			changeDeleteToggle: !this.state.changeDeleteToggle
		})
	}
	//needs to be updated w/ redux actions
	deleteAccount = () => {
		this.props.deleteAccount(this.props.user.user._id)
			.then(() => {
				this.props.clearHistory();
				//for redirect to login
				setTimeout(() => {
					this.props.clearStatus();
					//this.setState({accountDeleted:true});
				}, 1500);
			})
			.catch((err) => {
				console.log(err);
			});
	}
	render() {
		//console.log(this.props.user);
		//console.log(this.props.notes);

		if (!this.props.user.authenticated) {
			return <Redirect to='/' />;
		}

		/*
		if (this.state.accountDeleted) {
			return <Redirect to='/login'/>;
		}
		*/

		return (
			<div>
				<Header key={2} id={2} isBackReq={true} isUserReq={true} />
				<div className="container-fluid">

					<div className="row">
						<div className='col-12 col-sm-6'>
							<div className="card">
								<div className="card-header">
									<h3>{this.props.user.user.displayName.name}</h3>
									<i className="fa fa-user" aria-hidden="true"></i>
								</div>
								<div className="card-block">
									<p className="card-text ml-3 mt-2">Number of notes: {this.props.notes.notes.length}</p>
									<button className="btn ml-3 mb-2" onClick={this.showPassForm}>Change Password</button>
									{this.state.changePassToggle && (<PasswordForm
										showPassForm={this.showPassForm}
										handleError={this.props.handleError}
										userID={this.props.user._id} />)}
									{!this.state.changeDeleteToggle && !this.state.changePassToggle &&
										(<p><button className="btn btn-danger ml-3" onClick={this.showDelTog}>Delete Account</button></p>
										)}
									{this.state.changeDeleteToggle && !this.state.changePassToggle &&
										(<p>
											<button className="btn btn-success ml-3 mb-2" onClick={this.showDelTog}>Keep Account</button>
										</p>)}
									{this.state.changeDeleteToggle && !this.state.changePassToggle &&
										(<p>
											<button className="btn btn-danger ml-3" onClick={this.deleteAccount}>Confirm Delete!</button>
										</p>)}
								</div>
							</div>
						</div>
					</div>
				</div>
				<ErrorFooter errMsg={this.props.user.err} />
			</div>
		)
	}
}

const UserProfile = connect(mapStateToProps, mapDispatchToProps)(UserProfileBase);

export default UserProfile;


