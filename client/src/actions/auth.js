//Redux
//simple example with redux managing authentication state
//LOGIN REDUCER
export const LOGIN="LOGIN";
export const LOGOUT="LOGOUT";

//auth action creators
export const loginUser = (user) => {
	return {type:LOGIN, user:user};
};
export const logoutUser = () => {
	return {type:LOGOUT, user:{}};
};