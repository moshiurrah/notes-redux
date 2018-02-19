import axios from 'axios';


export const ADDING="ADDING";
export const addingNotes = () => {
	return {type:ADDING};
};
export const ADDED="ADDED";
export const addedNote = (noteContent) => {
  console.log(noteContent);
	return {type:ADDED, notes:noteContent};
};
export const ADDFAILED="ADDFAILED";
export const addFailed = (err) => {
	return {type:ADDFAILED, err:err};
};


export const addNoteAsync = (user, noteContent) => {
	return function (dispatch, getState) {
  	console.log(getState());
  	
  	if (getState().notesReducer.undoState.present.limReached) {
  	  console.log("Limit reached!")
  	} else {
  		dispatch(addingNotes());
  		//axios add note
  		axios({
  		  method: 'post',
  		  url: `/api/${user}/add`,
  		  data: {content:noteContent}
  		}).then (res => {
  			console.log(res.data.content);
  			dispatch(addedNote(res.data.content));
  		}).catch (err =>{
  			dispatch(addFailed(err.response.data.error));
  		});
  	}
	}
};