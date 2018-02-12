import {LOGGINGIN, LOGGEDIN, LOGOUT, LOGINFAILED } from '../actions/auth'

//auth reducer
const defaultAuth = {
	authenticated: false,
	fetching:false,
	user:{}
}

const authReducer = (state=defaultAuth, action) => {
	switch (action.type) {
		case LOGGINGIN:
			return {authenticated: false, fetching:true}
		case LOGGEDIN:
			return {authenticated: true, fetching:false, user:action.user}
		case LOGOUT:
			return {authenticated: false, fetching:false, user:action.user}
		case LOGINFAILED:
			return {authenticated: false, fetching:false, user:action.user, err:action.err}
		default:
			return state;
	}
}

export default authReducer;