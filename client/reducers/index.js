import { combineReducers } from 'redux';

//import all reducers here
import petReducer from './petReducer.js';

// combine reducers
const reducers = combineReducers({
  //if we had other reducers, they would go here
  pet: petReducer,
});

// make the combined reducers available for import
export default reducers;
