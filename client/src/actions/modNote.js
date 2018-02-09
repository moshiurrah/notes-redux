export const ADD="ADD";
export const DEL="DELETE";
export const DELALL="DELALL";
export const EDIT="EDIT";

//auth action creators
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