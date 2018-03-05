import axios from 'axios';

export const DEL="DELETE";
export const DELALL="DELALL";
export const EDIT="EDIT";

//async getNotes
export const FETCHNGNOTES="FETCHNGNOTES";
export const fetchingNotes = () => {
	return {type:FETCHNGNOTES};
};

export const CLEARNOTES="CLEARNOTES";
export const clearNotes = () => {
	return {type:CLEARNOTES};
};

export const GOTNOTES="GOTNOTES";
export const gotNotes = (notes) => {
	return {type:GOTNOTES, notes:notes};
};

export const GETFAILED="GETFAILED";
export const getFailed = (err) => {
	return {type:GETFAILED, err:err};
};


export const getNotesAsync = (user) => {
	//return {type:LOGIN, user:user};
	return function (dispatch, getState) {
		//console.log(getState());
		if (getState().authReducer.authenticated) {
			dispatch(fetchingNotes());
			//axios login
			return axios({
			  method: 'get',
			  url: `/api/${user}`,
			}).then (res => {
				//console.log(res.data.content);
				//dispatch(gotNotes(res.data.content));
				dispatch(gotNotes(res.data.content));
			}).catch (err =>{
				dispatch(getFailed(err));
			});
		}
	}
};