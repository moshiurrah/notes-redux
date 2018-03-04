//developed with the guidlines from here:
//https://github.com/reactjs/redux/blob/master/docs/recipes/ImplementingUndoHistory.md
import {UNDOING, UNDONE, REDONE, UNDOFAILED, CLEARPAST} from '../actions/undo'


const undoEnhancer = (reducer) => {

    const initState = {
      undoState: {
        past: [],
        present: reducer(undefined, {}),
        future: []
      },
      fetching:false,
      hasHistory:false,
      hasFuture: false,
      err:''
    }
    
     return function (state = initState, action) {
      const { past, present, future } = state.undoState;
      var hasHistory = past.filter(past => past.fetching === false && past.err==='').length>1;
      var hasFuture = future.length > 0;
      switch (action.type) {
        case UNDOING:
          return {...state, fetching: true, err:''};
        case REDONE:
                    //undone modified to allow desired time travel
          const next = action.desiredFuture;
          const newFuture = past.slice(action.desiredFutureIndex, future.length);
          hasHistory = newPast.filter(past => past.fetching === false && past.err==='').length>1;
          hasFuture = newFuture.filter(future => future.fetching === false && future.err==='').length>0;
  
          
          return {
              undoState: {
                past: [...past, present],
                present: next,
                future: newFuture
              },
              fetching:false,
              hasHistory:hasHistory,
              hasFuture: hasFuture,
              err:''
          }
          
        case UNDONE:
          //undone modified to allow desired time travel
          const previous = action.desiredPast;
          const newPast = past.slice(0,action.desiredPastIndex-1);
          hasHistory = newPast.filter(past => past.fetching === false && past.err==='').length>1;
          
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
              hasHistory:hasHistory,
              hasFuture: hasFuture,
              err:''
          }
          
        case UNDOFAILED:
          console.log(action.err);
          return {...state, fetching:false, hasHistory:hasHistory, err:action.err};
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
            hasHistory:hasHistory,
            err:''
          }
      }
      
     }
     
    
}

export default undoEnhancer;
