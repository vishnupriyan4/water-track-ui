import { SET_ID } from '../actions/types';
const INITIAL_STATE = {
    userId: null
};

const authReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_ID :
            state = {...state, userId: action.payload};
            break;
        default :
            state = {
                ...state
            };
            break;
    }
    return state;
}

export default authReducer;