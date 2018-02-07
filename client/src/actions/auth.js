//Redux
//simple example with redux managing authentication state
//LOGIN REDUCER
export const LOGIN="LOGIN";
export const LOGOUT="LOGOUT";

//auth action creators
export const loginUser = () => {
	return {type:LOGIN};
};
export const logoutUser = () => {
	return {type:LOGOUT};
};