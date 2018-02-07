import {LOGIN, LOGOUT } from '../actions/auth'

//auth reducer
const defaultAuth = {
	authenticated: false
}

export const authReducer = (state=defaultAuth, action) => {
	switch (action.type) {
		case LOGIN:
			return {authenticated: true}
		case LOGOUT:
			return {authenticated: false}
		default:
			return state;
	}
}