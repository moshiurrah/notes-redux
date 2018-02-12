import {FETCHNGNOTES, GOTNOTES,GETFAILED, ADD, DEL, EDIT, DELALL } from '../actions/modNote'


const defState = {user:'',fetching:false, notes:[], err:''};

const notesReducer = (state = defState, action) => {
	switch (action.type) {
		case FETCHNGNOTES:
			return {...state, fetching: true, user:action.user};
		case GOTNOTES:
			console.log(action.notes);
			return {...state, fetching: false, notes: state.notes.concat(action.notes)};
		case GETFAILED:
			return {...state, fetching:false, err:action.err};
		case ADD:
			return {...state, notes: [action.newNote].concat(state.notes)};
		case DEL:
			return {...state, notes: state.notes.filter((note) => (note.id !== action.id))};
		case DELALL:
			return {...state, notes: []};
		case EDIT:
			return {...state, notes: state.notes.map(
				note => (note.id !== action.id) ?
					note :{...note,content:action.newNote} 
			)}
		default:
			return state;
	}
}

export default notesReducer;