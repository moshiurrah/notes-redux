//Redux
//simple example with redux managing authentication state
//LOGIN REDUCER
//SHOWS EXAMPLE OF CHAINED DISPATCHES W/ PROMISES, AS SUGGEST BY MOTHERFUCKING DAN HIMSELF
//https://github.com/reactjs/redux/issues/1676#issuecomment-216828910
import axios from 'axios';
import { getNotesAsync, clearNotes } from './fetchNotes';
import { clearPast } from './undo';
import { setColorFilter } from './changeColor';


export const logoutAndClearNotesAndClearPast = (user) => {
  //console.log('clearing user');
  return (dispatch, getState) => {
    //console.log('clearing notes');
    return dispatch(logoutAndClearNotes(user)).then(() => {
      //console.log('clearing history');
      return dispatch(clearPast());
    }).catch(err => {
      console.log(err);
    })
  }
}


export const logoutAndClearNotes = (user) => {
  return (dispatch, getState) => {
    return dispatch(logoutUserAsync(user)).then(() => {
      return dispatch(clearNotes());
    }).catch(err => {
      console.log(err);
    })
  }
}

export const logoutUserAsync = (user) => {
  return (dispatch) => {
    dispatch(loggingUserOut(user));
    return axios({
      method: 'get',
      url: '/logout',
    }).then(res => {
      dispatch(setColorFilter(''));
      dispatch(loggedOut());
      //console.log('Session Logged out!');
    }).catch(err => {
      dispatch(logoutFailed(user, err));
    });
  }
};

//SHOWS EXAMPLE OF CHAINED DISPATCHES W/ PROMISES, AS SUGGEST BY MOTHERFUCKING DAN HIMSELF
//https://github.com/reactjs/redux/issues/1676#issuecomment-216828910
export const loginAndGetNotes = (user, isLogin) => {
  return (dispatch, getState) => {
    return dispatch(loginUserAsync(user, isLogin)).then(() => {
      const fetchedUser = getState().authReducer.user._id;
      //console.log(fetchedUser);
      return dispatch(getNotesAsync(fetchedUser));
    }).catch(err => {
      console.log(err);
    })
  }
}

//fake async action with timeout
export const loginUserAsync = (user, isLogin) => {
  //return {type:LOGIN, user:user};
  //console.log('auth action says isLogin is ' + isLogin);
  var authRoute = '/loginuser';
  if (!isLogin) {
    authRoute = '/signupuser';
  }
  //console.log(authRoute);
  return (dispatch) => {
    dispatch(loggingUserIn(user));
    //axios login
    return axios({
      method: 'post',
      url: authRoute,
      data: user
    }).then(res => {
      //console.log(res.data.content);
      dispatch(loggedin(res.data.content));
    }).catch(err => {
      dispatch(loginFailed(user, err.response.data.error, isLogin));
    });
    //fake async login
    /*
    setTimeout(function() {
      dispatch(loggedin(user));
    }, 3500);
    */
  }
};



export const LOGGINGIN = "LOGGINGIN";
export const loggingUserIn = (user) => {
  return { type: LOGGINGIN, user: user };
};

export const LOGGEDIN = "LOGGEDIN";
export const loggedin = (user) => {
  return { type: LOGGEDIN, user: user };
}

export const LOGINFAILED = "LOGINFAILED";
export const loginFailed = (user, err, isLogin) => {
  return { type: LOGINFAILED, user: user, err: err, isLogin: isLogin };
};


export const LOGGINGOUT = "LOGGINGOUT";
export const loggingUserOut = (user) => {
  return { type: LOGGINGOUT, user: user };
};

export const LOGGEDOUT = "LOGGEDOUT";
export const loggedOut = () => {
  return { type: LOGGEDOUT, user: {} };
}

export const LOGOUTFAILED = "LOGOUTFAILED";
export const logoutFailed = (user, err) => {
  return { type: LOGOUTFAILED, user: user, err: err };
};


