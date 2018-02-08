import {ADD, DEL } from '../actions/modNote'


const notesReducer = (state=[], action) => {
	switch (action.type) {
		case ADD:
			return [state.concat(action.newNote)]
		case DEL:
			return state;
		default:
			return state;
	}
}

export default notesReducer;