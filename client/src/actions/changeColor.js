import axios from 'axios';


export const CHANGINGCOLOR="CHANGINGCOLOR";
export const changingColor = (newColor) => {
	return {type:CHANGINGCOLOR, color:newColor};
};
export const CHANGEDCOLOR="CHANGEDCOLOR";
export const changedColor = (newColor) => {
  console.log(newColor);
	return {type:CHANGEDCOLOR, color:newColor};
};
export const CHANGECOLORFAILED="CHANGECOLORFAILED";
export const changeColorFailed = (err) => {
	return {type:CHANGECOLORFAILED, err:err};
};


export const changeColorAsync = (user, noteID, newColor) => {
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