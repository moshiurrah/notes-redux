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

export const REDONE="REDONE";
export const redone = (future, futureIndex) => {
  console.log(future);
  console.log(futureIndex);
	return {type:REDONE, desiredFuture:future, desiredFutureIndex:futureIndex};
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
		
		/*undo action*/
		const past = getState().notesReducer.undoState.past;
		const hasHistory = getState().notesReducer.hasHistory;
		console.log(past);
		var desiredIndex=past.length-1;
		const successfulPast = past.filter( (past, index) => {
		  desiredIndex=index;
		  return past.fetching === false && past.err==='';
		})
		

		if (hasHistory) {
		  dispatch(undoing());
  		console.log(successfulPast[successfulPast.length-1]);
  		
  		//axios redo and refresh
  		return axios({
  		  method: 'post',
  		  url: `/api/${user}/refresh`,
  		  data: {content:successfulPast[successfulPast.length-1].notes}
  		}).then (res => {
  			//console.log(res.data.content);
  			//NOTE THE POTENTIAL DISCONNECT B/W BACKEND AND FRONTEND
  			//the above is hopefully fixed by the spread operator replacing the notes component with what the server is seeing
  			dispatch(undone({...successfulPast[successfulPast.length-1],notes:res.data.content},desiredIndex))
  		}).catch (err =>{
  			dispatch(undoFailed(err.response.data.error));
  		});
		} else {
		  dispatch(undoFailed('Past Unavailable!'));
		}


  }
}



export const redoAsync = (user) => {
  return function (dispatch, getState) {
  	console.log('in redo')
    console.log(getState());
		
		/*undo action*/
		const future = getState().notesReducer.undoState.future;
		const hasFuture = getState().notesReducer.hasFuture;
		console.log(future);
		var desiredIndex=future.length-1;
		const successfulFuture = future.filter( (future, index) => {
		  desiredIndex=index;
		  return future.fetching === false && future.err==='';
		})
		console.log(successfulFuture);
		

		if (hasFuture) {
		  dispatch(undoing());
  		console.log(successfulFuture[desiredIndex]);
  		
  		//axios redo and refresh
  		return axios({
  		  method: 'post',
  		  url: `/api/${user}/refresh`,
  		  data: {content:successfulFuture[desiredIndex].notes}
  		}).then (res => {
  			dispatch(redone({...successfulFuture[desiredIndex],notes:res.data.content},desiredIndex))
  		}).catch (err =>{
  			dispatch(undoFailed(err.response.data.error));
  		});
		} else {
		  dispatch(undoFailed('Future Unavailable!'));
		}


  }
}