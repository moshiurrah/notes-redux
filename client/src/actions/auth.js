//Redux
//simple example with redux managing authentication state
//LOGIN REDUCER
import axios from 'axios';


//fake async action with timeout
export const loginUserAsync = (user) => {
	//return {type:LOGIN, user:user};
	return function (dispatch) {
		dispatch(loggingUserIn(user));
		
		
		//axios login
		axios({
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