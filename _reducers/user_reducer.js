// import {
//     LOGIN_USER,
//     REGISTER_USER,
//     AUTH_USER
// } from '../_actions/types';

// export default function (state = {}, action) {
//     switch (action.type) {
//         case LOGIN_USER:
//             return { ...state, loginSuccess: action.payload }
//             break;
//         case REGISTER_USER:
//             return { ...state, register: action.payload }
//             break;
//         case AUTH_USER:
//             return { ...state, userData: action.payload }
//             break;
//         default:
//             return state;
//     }
// }
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
} from '../_actions/types';
 

export default function(state={},action){
    console.log("action==>",action)
    switch(action.type){
        case REGISTER_USER:
            console.log("REGISTER_USER ==> action.payload",action.payload)
            return {...state, register: action.payload }
        case LOGIN_USER:
            console.log("LOGIN_USER ==> action.payload",action.payload)
            return { ...state, loginSucces: action.payload }
        case AUTH_USER:
            console.log("AUTH_USER ==> action.payload",action.payload)
            return {...state, userData: action.payload }
        case LOGOUT_USER:
            console.log("LOGOUT_USER ===> action.payload",action.payload)
            return {...state }
        default:
            console.log('state ==> ',state)
            return state;
            // 여기서 문제이다.....
            // return {...state, userData: {} }
    }
}