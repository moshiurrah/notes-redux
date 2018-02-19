import axios from 'axios';

export const UNDOING="UNDOING";
export const undoing = () => {
	return {type:UNDOING};
};


export const UNDONE="UNDONE";
export const undone = (past, pastIndex) => {
  console.log(past);
  console.log(pastIndex);
	return {type:UNDONE, desiredPast:past, desiredPastIndex:pastIndex};
};

export const UNDOFAILED="UNDOFAILED";
export const undoFailed = (err) => {
	return {type:UNDOFAILED, err:err};
};

export const CLEARPAST="CLEARPAST";
export const clearPast = () => {
	return {type:CLEARPAST};
};


export const undoAsync = (user) => {
  return function (dispatch, getState) {
    console.log(getState());
		dispatch(undoing());
		const past = getState().notesReducer.undoState.past;
		console.log(past);
  	//dispatch(undoing());
		var desiredIndex=past.length-1;
		const successfulPast = past.filter( (past, index) => {
		  desiredIndex=index;
		  return past.fetching === false && past.err==='';
		})
		
		if (successfulPast.length > 1) {
  		console.log(successfulPast[successfulPast.length-1]);
  		setTimeout(
  		  function () {dispatch(undone(successfulPast[successfulPast.length-1],desiredIndex))}
  	  ,1000);
  	  console.log(getState());
		} else {
		  dispatch(undoFailed('Past Unavailable!'));
		}

  }
}