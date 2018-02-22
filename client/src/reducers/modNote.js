import {CLEARNOTES, FETCHNGNOTES, GOTNOTES,GETFAILED, EDIT, DELALL } from '../actions/fetchNotes'
import {ADDING, ADDED, ADDFAILED} from '../actions/addNote'
import {DELING, DELETED, DELFAILED} from '../actions/delNote'
import {EDITING, EDITED, EDITFAILED} from '../actions/editNote'

import undoEnhancer from './undo';

//limit the number of notes
const NUM_LIMIT=25;
const defState = {fetching:false, notes:[], err:'', limReached:false, lastNoteID:''};

const notesReducerBase = (state = defState, action) => {
	switch (action.type) {
		//initial note fetch
		case FETCHNGNOTES:
			return {...state, fetching: true, err:''};
		case GOTNOTES:
			//console.log(action.notes);
			return {...state, fetching: false, notes: action.notes , err:'', limReached:action.notes.length >= NUM_LIMIT};
		case GETFAILED:
			return {...state, fetching:false, err:action.err};
		
		//add Notes
		case ADDING:
			return {...state, fetching:true, err:''};
		case ADDED:
			return {...state, fetching:false, notes: [action.notes].concat(state.notes), err:'', limReached:state.notes.length >= NUM_LIMIT-1, lastNoteID:action.notes._id};
		case ADDFAILED:
			return {...state, fetching:false, err:action.err};
		
		//deleting note
		case DELING:
			return {...state, fetching:true, err:''};
		case DELETED:
			//console.log(action.notes);
			var newNotes = state.notes.filter(note => {
				console.log(note);
				return note._id !== action.notes._id;
			});
			return {...state, fetching:false, notes: newNotes, err:'', limReached:newNotes.length >= NUM_LIMIT};
		case DELFAILED:
			return {...state, fetching:false, err:action.err};
			
		//editing Note
		case EDITING:
			return {...state, fetching:true, err:''};
		case EDITED:
			//console.log(action.notes);
			var newNotes = state.notes.map (note => {
				console.log(note);
				if (note._id === action.notes._id) {
					return action.notes;
				} else {
					return note;
				}
			});
			console.log(newNotes);
			return {...state, fetching:false, notes: newNotes, err:''};
		case EDITFAILED:
			return {...state, fetching:false, err:action.err};
			
		//return to default state
		case CLEARNOTES:
			return defState;
		default:
			return state;
	}
}
const notesReducer = undoEnhancer(notesReducerBase);
export default notesReducer;