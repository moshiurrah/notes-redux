import axios from 'axios';
import {logoutAndClearNotesAndClearPast} from './auth';


export const CHANGINGPASS="CHANGINGPASS";
export const changingPass = () => {
	return {type:CHANGINGPASS};
};
export const CHANGEDPASS="CHANGEDPASS";
export const changedPass = (message) => {
	return {type:CHANGEDPASS, message:message};
};
export const CHANGEPASSFAILED="CHANGEPASSFAILED";
export const changePassFailed = (err) => {
	return {type:CHANGEPASSFAILED, err:err};
};



/*
export const changePassAndLogOut = (user, curPass, newPass) => {
	return (dispatch, getState) => {
		return dispatch(changePassAsync(user, curPass, newPass)).then(() => {
			const fetchedUser=getState().authReducer.user._id;
			console.log(fetchedUser);
			//wait 2 seconds and log out
			setTimeout(()=>{return dispatch(logoutAndClearNotesAndClearPast(fetchedUser))}, 2000);
			return dispatch(logoutAndClearNotesAndClearPast(fetchedUser));
		}).catch (err => {
			dispatch(changePassFailed(err.response.data.error));
			//console.log(err);
		})
	}
}
*/

export const changePassAsync = (user, curPass, newPass) => {
	return function (dispatch) {
  		dispatch(changingPass());
  		axios({
  		  method: 'post',
  		  url: `/api/${user}/changePass`,
  		  data: {curPass:curPass, newPass:newPass}
  		}).then (res => {
  			console.log(res.data.content);
  			dispatch(changedPass(res.data.content));
  		}).catch (err =>{
  			dispatch(changePassFailed(err.response.data.error));
  		});
  	
	}
};