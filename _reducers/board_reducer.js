import {
    FREEBOARD_LIST,
    FREEBOARD_WRITE,
    FREEBOARD_UPDATE,
    FREEBOARD_DELETE,
  } from "../_actions/BoardTypes";

  
export default function(state={},action){
    switch(action.type){
        case FREEBOARD_LIST:
            return {...state, freeBoard: action.payload }
        case FREEBOARD_WRITE:
            return { ...state, freeBoard: action.payload }
        case FREEBOARD_UPDATE:
            return {...state, freeBoard: action.payload }
        case FREEBOARD_DELETE:
            return {...state }
        default:
            return state;
    }
}