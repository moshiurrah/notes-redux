import {LOGGINGIN, LOGGEDIN, LOGINFAILED, LOGGINGOUT, LOGGEDOUT, LOGOUTFAILED } from '../actions/auth'

//auth reducer
const defaultAuth = {
	authenticated: false,
	fetching:false,
	user:{},
	err: ''
}

const authReducer = (state=defaultAuth, action) => {
	switch (action.type) {
		case LOGGINGIN:
			return {authenticated: false, fetching:true}
		case LOGGEDIN:
			return {authenticated: true, fetching:false, user:action.user}
		case LOGINFAILED:
			return {authenticated: false, fetching:false, user:action.user, err:action.err}
		case LOGGINGOUT:
			return {authenticated: false, fetching:true, user:action.user}
		case LOGGEDOUT:
			return {authenticated: false, fetching:false, user:action.user}
		case LOGOUTFAILED:
			return {authenticated: true, fetching:false, user:action.user, err:action.err}
		default:
			return state;
	}
}

export default authReducer;