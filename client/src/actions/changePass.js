import axios from 'axios';
//import {logoutAndClearNotesAndClearPast} from './auth';


export const CHANGINGPASS = "CHANGINGPASS";
export const changingPass = () => {
	return { type: CHANGINGPASS };
};
export const CHANGEDPASS = "CHANGEDPASS";
export const changedPass = (message) => {
	return { type: CHANGEDPASS, message: message };
};
export const CHANGEPASSFAILED = "CHANGEPASSFAILED";
export const changePassFailed = (err) => {
	return { type: CHANGEPASSFAILED, err: err };
};




export const changePassAsync = (user, curPass, newPass) => {
	return function (dispatch) {
		dispatch(changingPass());
		return axios({
			method: 'post',
			url: `/api/${user}/changePass`,
			data: { curPass: curPass, newPass: newPass }
		}).then(res => {
			console.log(res.data.content);
			dispatch(changedPass(res.data.content));
		}).catch(err => {
			dispatch(changePassFailed(err.response.data.error));
			throw err;
		});

	}
};