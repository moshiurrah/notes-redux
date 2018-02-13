import {FETCHNGNOTES, GOTNOTES,GETFAILED, EDIT, DELALL } from '../actions/fetchNotes'
import {ADDING, ADDED, ADDFAILED} from '../actions/addNote'

import {DELING, DELETED, DELFAILED} from '../actions/delNote'


const defState = {fetching:false, notes:[], err:''};

const notesReducer = (state = defState, action) => {
	switch (action.type) {
		//initial note fetch
		case FETCHNGNOTES:
			return {...state, fetching: true};
		case GOTNOTES:
			console.log(action.notes);
			return {...state, fetching: false, notes: action.notes};
		case GETFAILED:
			return {...state, fetching:false, err:action.err};
		
		//add Notes
		case ADDING:
			return {...state, fetching:true};
		case ADDED:
			return {...state, fetching:false, notes: action.notes};
		case ADDFAILED:
			return {...state, fetching:false, err:action.err};
		
		//deleting note
		case DELING:
			return {...state, fetching:true};
		case DELETED:
			return {...state, fetching:false, notes: action.notes};
		case DELFAILED:
			return {...state, fetching:false, err:action.err};
			
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