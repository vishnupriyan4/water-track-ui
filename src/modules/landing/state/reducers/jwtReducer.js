import { SET_JWT } from '../actions/types';

const INITIAL_STATE = null;

const setJwtReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_JWT :
            state = action.payload;
            break;
        default :
            state = state;
    }
    return state;
}

export default setJwtReducer;