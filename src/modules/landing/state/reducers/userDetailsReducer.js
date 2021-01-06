import { SET_USER_DETAILS, EDIT_NOTIFICATION_DETAILS, SET_JWT } from '../actions/types';
const INITIAL_STATE = {
    userDetails: null,
    postState: null
}

const userDetailsReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_USER_DETAILS :
            state = {...state, userDetails: action.payload}
            break;
            
        case EDIT_NOTIFICATION_DETAILS :
            const stateVal = {...state.userDetails};
            state = {...stateVal, notificationDetails : action.payload}
            break;

        default :
            state = {
                ...state
            }
    }
    return state;
}

export default userDetailsReducer;