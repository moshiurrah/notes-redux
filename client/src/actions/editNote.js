import axios from 'axios';


export const EDITING="EDITING";
export const editingNotes = (newNote) => {
	return {type:EDITING, notes:newNote};
};
export const EDITED="EDITED";
export const editedNote = (noteContent) => {
  console.log(noteContent);
	return {type:EDITED, notes:noteContent};
};
export const EDITFAILED="EDITFAILED";
export const editFailed = (err) => {
	return {type:EDITFAILED, err:err};
};


export const editNoteAsync = (user, noteID, newNote) => {
	return function (dispatch, getState) {
  	console.log(getState());
		dispatch(editingNotes());
		//axios add note
		axios({
		  method: 'put',
		  url: `/api/${user}/${noteID}`,
		  data: {
		  	content: newNote.toString()
		  }
		}).then (res => {
			console.log(res.data.content);
			dispatch(editedNote(res.data.content));
		}).catch (err =>{
			dispatch(editFailed(err.response.data.error));
		});
	}
};