import {CLEARNOTES, FETCHNGNOTES, GOTNOTES,GETFAILED, EDIT, DELALL } from '../actions/fetchNotes'
import {ADDING, ADDED, ADDFAILED} from '../actions/addNote'
import {DELING, DELETED, DELFAILED} from '../actions/delNote'
import {EDITING, EDITED, EDITFAILED} from '../actions/editNote'


const defState = {fetching:false, notes:[], err:''};

const notesReducer = (state = defState, action) => {
	switch (action.type) {
		//initial note fetch
		case FETCHNGNOTES:
			return {...state, fetching: true, err:''};
		case GOTNOTES:
			//console.log(action.notes);
			return {...state, fetching: false, notes: action.notes , err:''};
		case GETFAILED:
			return {...state, fetching:false, err:action.err};
		
		//add Notes
		case ADDING:
			return {...state, fetching:true, err:''};
		case ADDED:
			return {...state, fetching:false, notes: [action.notes].concat(state.notes), err:''};
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
			return {...state, fetching:false, notes: newNotes, err:''};
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

export default notesReducer;