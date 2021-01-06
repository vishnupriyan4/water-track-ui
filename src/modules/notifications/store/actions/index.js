import { NOTIFICATION_SAVE_BUTTON } from './types';

export const notificationSaveStatusChange = (status) => (dispatch) => {
    dispatch({
        type: NOTIFICATION_SAVE_BUTTON,
        payload: status
    })
}