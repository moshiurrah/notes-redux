import axios from 'axios';

export const ADD="ADD";
export const DEL="DELETE";
export const DELALL="DELALL";
export const EDIT="EDIT";

//note mod action creators
export const addNote = (noteContent) => {
	return {type:ADD, newNote:{content:noteContent, id:(new Date).getTime()}};
};
export const remNote = (id) => {
	return {type:DEL, id:id};
};
export const remAll = () => {
	return {type:DELALL};
};
export const editNote = (id,noteContent) => {
	return {type:EDIT, id:id, newNote:noteContent};
};


//async getNotes
export const FETCHNGNOTES="FETCHNGNOTES";
export const fetchingNotes = () => {
	return {type:FETCHNGNOTES};
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
	return function (dispatch) {
		dispatch(fetchingNotes());
		//axios login
		axios({
		  method: 'get',
		  url: `/api/${user}`,
		}).then (res => {
			console.log(res.data.content);
			//dispatch(gotNotes(res.data.content));
			dispatch(gotNotes(res.data.content));
		}).catch (err =>{
			dispatch(getFailed(err));
		});
	}
};