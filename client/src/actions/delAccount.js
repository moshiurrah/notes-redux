import axios from 'axios';
//import {logoutAndClearNotesAndClearPast} from './auth';


export const DELINGACCT = "DELINGACCT";
export const deletingAccount = () => {
	return { type: DELINGACCT };
};
export const DELETEDACCT = "DELETEDACCT";
export const deletedAccount = (message) => {
	return { type: DELETEDACCT, message: message };
};
export const DELETEFAILED = "DELETEFAILED";
export const deleteFailed = (err) => {
	return { type: DELETEFAILED, err: err };
};
export const CLEARSTATUS = "CLEARSTATUS";
export const clearAuthStat = () => {
	console.log('Clearing status!');
	return { type: CLEARSTATUS };
};

export const deleteAccountAsync = (user) => {
	return function (dispatch) {
		dispatch(deletingAccount());
		return axios({
			method: 'post',
			url: `/api/${user}/deleteAccount`,
		}).then(res => {
			console.log(res.data.content);
			dispatch(deletedAccount(res.data.content));
		}).catch(err => {
			dispatch(deleteFailed(err.response.data.error));
			throw err;
		});

	}
};