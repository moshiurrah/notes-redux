//Redux
//simple example with redux managing authentication state
//LOGIN REDUCER
//SHOWS EXAMPLE OF CHAINED DISPATCHES W/ PROMISES, AS SUGGEST BY MOTHERFUCKING DAN HIMSELF
//https://github.com/reactjs/redux/issues/1676#issuecomment-216828910
import axios from 'axios';
import { getNotesAsync} from './fetchNotes';


//SHOWS EXAMPLE OF CHAINED DISPATCHES W/ PROMISES, AS SUGGEST BY MOTHERFUCKING DAN HIMSELF
//https://github.com/reactjs/redux/issues/1676#issuecomment-216828910
export const loginAndGetNotes = (user) => {
	return (dispatch, getState) => {
		return dispatch(loginUserAsync(user)).then(() => {
			const fetchedUser=getState().authReducer.user;
			console.log(fetchedUser);
			return dispatch(getNotesAsync(fetchedUser));
		}).catch (err => {
			console.log(err);
		})
	}
}

//fake async action with timeout
export const loginUserAsync = (user) => {
	//return {type:LOGIN, user:user};
	return  (dispatch) => {
		dispatch(loggingUserIn(user));
		//axios login
		return axios({
		  method: 'post',
		  url: '/signup',
		  data: user
		}).then (res => {
			console.log(res.data.content);
			dispatch(loggedin(res.data.content));
		}).catch (err =>{
			dispatch(loginFailed({}, err.response.data.error));
		});
		//fake async login
		/*
		setTimeout(function() {
			dispatch(loggedin(user));
		}, 3500);
		*/
	}
};



export const LOGGINGIN="LOGGINGIN";
export const loggingUserIn = (user) => {
	return {type:LOGGINGIN, user: user};
};

export const LOGGEDIN="LOGGEDIN";
export const loggedin = (user) => {
	return {type:LOGGEDIN, user:user};
}

export const LOGINFAILED="LOGINFAILED";
export const loginFailed = (user, err) => {
	return {type:LOGINFAILED, user:user, err: err};
};

export const LOGOUT="LOGOUT";
export const logoutUser = () => {
	return {type:LOGOUT, user:{}};
};