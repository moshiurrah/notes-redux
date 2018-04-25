import { LOGGINGIN, LOGGEDIN, LOGINFAILED, LOGGINGOUT, LOGGEDOUT, LOGOUTFAILED } from '../actions/auth'
import { CHANGINGPASS, CHANGEDPASS, CHANGEPASSFAILED } from '../actions/changePass'
import { DELINGACCT, DELETEDACCT, DELETEFAILED, CLEARSTATUS } from '../actions/delAccount'

//auth reducer
const defaultAuth = {
	authenticated: false,
	fetching: false,
	user: {},
	isLogin: true,
	err: ''
}

const authReducer = (state = defaultAuth, action) => {
	switch (action.type) {
		case LOGGINGIN:
			return { authenticated: false, fetching: true }
		case LOGGEDIN:
			return { authenticated: true, fetching: false, user: action.user }
		case LOGINFAILED:
			return { authenticated: false, fetching: false, user: action.user, err: action.err, isLogin: action.isLogin }
		case LOGGINGOUT:
			return { authenticated: false, fetching: true, user: action.user }
		case LOGGEDOUT:
			return { authenticated: false, fetching: false, user: action.user }
		case LOGOUTFAILED:
			return { authenticated: true, fetching: false, user: action.user, err: action.err }
		case CHANGINGPASS:
			return { ...state, fetching: true }
		case CHANGEDPASS:
			return { ...state, fetching: false, err: action.message }
		case CHANGEPASSFAILED:
			return { ...state, fetching: false, err: action.err }
		case DELINGACCT:
			return { ...state, fetching: true }
		case DELETEDACCT:
			return { ...state, fetching: false, err: action.message }
		case DELETEFAILED:
			return { ...state, fetching: false, err: action.err }
		case CLEARSTATUS:
			return defaultAuth;
		default:
			return state;
	}
}

export default authReducer;