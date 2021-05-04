import { combineReducers } from 'redux';
import user from './user_reducer';
import freeBoard from './board_reducer'

// const rootReducer = combineReducers({
//     user
// })

export const rootReducer = combineReducers({
    user,
    freeBoard
});