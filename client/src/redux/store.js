import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { monthReducer } from './reducers/monthReducer.js';
import { eventsArrReducer } from './reducers/eventsArrReducer.js';
import { dateStringReducer } from './reducers/dateStringReducer.js';

const reducer = combineReducers({
    calendarContent: monthReducer,
    eventsContent: eventsArrReducer,
    dateStringContent: dateStringReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export { store };