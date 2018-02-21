import {SET_COLOR_FILTER} from '../actions/changeColor'


const colorReducer = (state = '', action) => {
    
  switch (action.type) {
    case SET_COLOR_FILTER:
      return action.color;
    default:
      return state;
  }
		  
}

export default colorReducer;