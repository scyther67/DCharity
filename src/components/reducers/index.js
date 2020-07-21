import { combineReducers } from 'redux';
import donateReducer from './donateReducer';

export default combineReducers({
    donate:donateReducer
})