import {combineReducers} from 'redux';
import informationReducer from './reducer-information';

const allReducers = combineReducers({
    informationReducer
});

export default allReducers;
