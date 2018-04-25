import axios from 'axios';


export const EDITING = "EDITING";
export const editingNotes = (newNote, newColor) => {
  return { type: EDITING, notes: newNote, color: newColor };
};
export const EDITED = "EDITED";
export const editedNote = (noteContent) => {
  //console.log(noteContent);
  return { type: EDITED, notes: noteContent };
};
export const EDITFAILED = "EDITFAILED";
export const editFailed = (err) => {
  return { type: EDITFAILED, err: err };
};


export const editNoteAsync = (user, noteID, newNote, noteColor) => {
  return function (dispatch, getState) {
    //console.log(getState());
    dispatch(editingNotes());
    //axios add note
    axios({
      method: 'put',
      url: `/api/${user}/${noteID}`,
      data: {
        content: newNote.toString(),
        color: noteColor
      }
    }).then(res => {
      //console.log(res.data.content);
      ////console.log(res.data.color);
      dispatch(editedNote(res.data.content));
    }).catch(err => {
      dispatch(editFailed(err.response.data.error));
    });
  }
};