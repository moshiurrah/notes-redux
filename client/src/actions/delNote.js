import axios from 'axios';


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


export const delNoteAsync = (user, noteID) => {
	return function (dispatch, getState) {
  	console.log(getState());
		dispatch(delingNotes());
		//axios add note
		axios({
		  method: 'delete',
		  url: `/api/${user}/${noteID}`,
		}).then (res => {
			console.log(res.data.content);
			dispatch(deletedNote(res.data.content));
		}).catch (err =>{
			dispatch(deleteFailed(err.response.data.error));
		});
	}
};