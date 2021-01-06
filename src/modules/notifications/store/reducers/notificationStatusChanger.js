import { NOTIFICATION_SAVE_BUTTON } from '../actions/types';

const INITIAL_STATE = true;

const notificationSaveStatusChangerReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case NOTIFICATION_SAVE_BUTTON :
            state = action.payload;
            break;
        
        default :
            state = state;
    }
    return state;
}

export default notificationSaveStatusChangerReducer;