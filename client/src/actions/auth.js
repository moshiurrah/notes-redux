//Redux
//simple example with redux managing authentication state
//LOGIN REDUCER


//login successful



//auth action creators


//fake async action with timeout
export const loginUserAsync = (user) => {
	//return {type:LOGIN, user:user};
	return function (dispatch) {
		dispatch(loggingUserIn(user));
		setTimeout(function() {
			dispatch(loggedin(user));
		}, 3500);
		
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
export const loginFailed = (user) => {
	return {type:LOGINFAILED, user:user};
};

export const LOGOUT="LOGOUT";
export const logoutUser = () => {
	return {type:LOGOUT, user:{}};
};