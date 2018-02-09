import {ADD, DEL, EDIT, DELALL } from '../actions/modNote'


const notesReducer = (state = [], action) => {
	switch (action.type) {
		case ADD:
			return [action.newNote].concat(state);
		case DEL:
			return state.filter((note) => (note.id !== action.id));
		case DELALL:
			return [];
		case EDIT:
			return state.map(
				note => (note.id !== action.id) ?
					note :{...note,content:action.newNote} 
			)
		default:
			return state;
	}
}

export default notesReducer;