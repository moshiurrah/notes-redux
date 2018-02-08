import {LOGIN, LOGOUT } from '../actions/auth'

//auth reducer
const defaultAuth = {
	authenticated: false,
	user:{}
}

const authReducer = (state=defaultAuth, action) => {
	switch (action.type) {
		case LOGIN:
			return {authenticated: true, user:action.user}
		case LOGOUT:
			return {authenticated: false, user:action.user}
		default:
			return state;
	}
}

export default authReducer;