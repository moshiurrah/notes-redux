export const ADD="ADD";
export const DEL="DELETE";

//auth action creators
export const addNote = (noteContent) => {
	return {type:ADD, newNote:{content:noteContent, id:(new Date).getTime()}};
};
export const remNote = (id) => {
	return {type:DEL, id:id};
};