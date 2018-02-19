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
		
		const past = getState().notesReducer.undoState.past;
		const hasHistory = getState().notesReducer.hasHistory;
		console.log(past);
  	//dispatch(undoing());
		var desiredIndex=past.length-1;
		const successfulPast = past.filter( (past, index) => {
		  desiredIndex=index;
		  return past.fetching === false && past.err==='';
		})
		
		if (hasHistory) {
		  dispatch(undoing());
  		console.log(successfulPast[successfulPast.length-1]);
  		
  		//axios redo and refresh
  		axios({
  		  method: 'post',
  		  url: `/api/${user}/refresh`,
  		  data: {content:successfulPast[successfulPast.length-1].notes}
  		}).then (res => {
  			console.log(res.data.content);
  			//NOTE THE POTENTIAL DISCONNECT B/W BACKEND AND FRONTEND
  			//the above is hopefully fixed by the spread operator replacing the notes component with what the server is seeing
  			dispatch(undone({...successfulPast[successfulPast.length-1],notes:res.data.content},desiredIndex))
  		}).catch (err =>{
  			dispatch(undoFailed(err.response.data.error));
  		});
  		
  		/*
  		setTimeout(
  		  function () {dispatch(undone(successfulPast[successfulPast.length-1],desiredIndex))}
  	  ,1000);
  	  */
  	  console.log(getState());
		} else {
		  dispatch(undoFailed('Past Unavailable!'));
		}

  }
}