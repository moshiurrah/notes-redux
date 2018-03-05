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
      var hasFuture =  future.filter(future => future.fetching === false && future.err==='').length>0;
      switch (action.type) {
        case UNDOING:
          return {...state, fetching: true, err:''};
        case REDONE:
          //undone modified to allow desired time travel
          const next = action.desiredFuture;
          const newFuture = future.slice(action.desiredFutureIndex+1, future.length);
          const newPastRedone = [...past, present]; //shift present to the past
          //console.log('REDONE PAST');
          //console.log(newPastRedone);
          //console.log('REDONE PRESENT');
          //console.log(next); //future is now the present
          //console.log('REDONE FUTURE');
          //console.log(newFuture);
          //hasHistory = true;
          hasHistory = newPastRedone.filter(past => past.fetching === false && past.err==='').length>1;
          hasFuture = newFuture.filter(future => future.fetching === false && future.err==='').length>0;
  
          
          return {
              undoState: {
                past: newPastRedone,
                present: next,
                future: newFuture
              },
              fetching:false,
              hasHistory: hasHistory,
              hasFuture: hasFuture,
              err:''
          }
          
        case UNDONE:
          //undone modified to allow desired time travel
          const previous = action.desiredPast;
          //old code, was maintaiining unsuccessful past
          //const newPast = past.slice(0,action.desiredPastIndex-1);
          //ditch uncsuccesful pasts
          const successfulPast = past.filter( (past, index) => {
    		    return past.fetching === false && past.err==='';
    		  })
    		  const newPast = successfulPast.slice(0,successfulPast.length-1);
          const newFutureUndone = [present, ...future];
          //the first past is invalid?
          hasHistory = newPast.filter(past => past.fetching === false && past.err==='').length>1;
          hasFuture = newFutureUndone.filter(future => future.fetching === false && future.err==='').length>0;
          
          
          //console.log('Undone PAST');
          //console.log(newPast);
          //console.log('Undone PRESENT');
          //console.log(previous); //future is now the present
          //console.log('Undone FUTURE');
          //console.log(newFutureUndone);
          
          return {
              undoState: {
                past: newPast,
                present: previous,
                future: newFutureUndone
              },
              fetching:false,
              hasHistory:hasHistory,
              hasFuture: hasFuture,
              err:''
          }
          
        case UNDOFAILED:
          //console.log(action.err);
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
            hasFuture: hasFuture,
            err:''
          }
      }
      
     }
     
    
}

export default undoEnhancer;
