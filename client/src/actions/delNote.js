import axios from 'axios';
import { clearNotes } from '../actions/fetchNotes';

export const DELING="DELING";
export const delingNotes = () => {
	return {type:DELING};
};
export const DELETED="DELETED";
export const deletedNote = (noteContent) => {
  console.log(noteContent);
	return {type:DELETED, notes:noteContent};
};
export const DELFAILED="DELFAILED";
export const deleteFailed = (err) => {
	return {type:DELFAILED, err:err};
};




export const delNoteAsync = (user, noteID, isdelAll=false) => {
	return function (dispatch, getState) {
  	console.log(getState());
		dispatch(delingNotes());
		
		var delUrl = `/api/${user}/${noteID}`
		if (isdelAll) delUrl = `/api/${user}/del`
		//axios add note
		axios({
		  method: 'delete',
		  url: delUrl
		}).then (res => {
			console.log(res.data.content);
			if (isdelAll) {
				dispatch(clearNotes());
			} else {
				dispatch(deletedNote(res.data.content));
			}
		}).catch (err =>{
			dispatch(deleteFailed(err.response.data.error));
		});
	}
};