//developed with the guidlines from here:
//https://github.com/reactjs/redux/blob/master/docs/recipes/ImplementingUndoHistory.md
import {UNDOING, UNDONE, UNDOFAILED, CLEARPAST} from '../actions/undo'


const undoEnhancer = (reducer) => {

    const initState = {
      undoState: {
        past: [],
        present: reducer(undefined, {}),
        future: []
      },
      fetching:false,
      err:''
    }
    
     return function (state = initState, action) {
      const { past, present, future } = state.undoState ;
      switch (action.type) {
        case UNDOING:
          return {...state, fetching: true, err:''};
        case UNDONE:
          //undone modified to allow desired time travel
          const previous = action.desiredPast;
          const newPast = past.slice(0,action.desiredPastIndex-1);
          //console.log("NNNNNNNNNNNEEEEEWWWW PAST!!!!!!");
          //console.log(newPast);
           //original UNDONE
           /*
          const previous = past[past.length - 1]
          const newPast = past.slice(0, past.length - 1)
          */
          
          return {
              undoState: {
                past: newPast,
                present: previous,
                future: [present, ...future]
              },
              fetching:false,
              err:''
          }
          
        case UNDOFAILED:
          console.log(action.err);
          return {...state, fetching:false, err:action.err};
        case CLEARPAST:
          return initState;
        default:
          // Delegate handling the action to the passed reducer
          const newPresent = reducer(present, action)
          if (present === newPresent) {
            return state
          }
          return {
            undoState: {
              past: [...past, present],
              present: newPresent,
              future: []
            },
            fetching:false,
            err:''
          }
      }
      
     }
     
    
}

export default undoEnhancer;
