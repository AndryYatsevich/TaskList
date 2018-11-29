import {combineReducers} from 'redux';
import category from './Store/Reducers/categoryReducer';
import toDo from './Store/Reducers/toDoReducer';

export default combineReducers({
    category,
    toDo
});