import allReducers from './Reducers/index';
import {createStore} from 'redux';

const store = createStore(allReducers);

store.subscribe(() => {
    console.log("Store updated", store.getState());
});

export default store;
