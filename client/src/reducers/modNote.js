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
			console.log(action.notes);
			return {...state, fetching: false, notes: action.notes , err:''};
		case GETFAILED:
			return {...state, fetching:false, err:action.err};
		
		//add Notes
		case ADDING:
			return {...state, fetching:true, err:''};
		case ADDED:
			return {...state, fetching:false, notes: action.notes, err:''};
		case ADDFAILED:
			return {...state, fetching:false, err:action.err};
		
		//deleting note
		case DELING:
			return {...state, fetching:true, err:''};
		case DELETED:
			return {...state, fetching:false, notes: action.notes, err:''};
		case DELFAILED:
			return {...state, fetching:false, err:action.err};
			
		//editing Note
		case EDITING:
			return {...state, fetching:true, err:''};
		case EDITED:
			return {...state, fetching:false, notes: action.notes, err:''};
		case EDITFAILED:
			return {...state, fetching:false, err:action.err};
			
		case DELALL:
			return {...state, notes: []};
		case EDIT:
			return {...state, notes: state.notes.map(
				note => (note.id !== action.id) ?
					note :{...note,content:action.newNote} 
			)}
			
		case CLEARNOTES:
			return defState;
		default:
			return state;
	}
}

export default notesReducer;