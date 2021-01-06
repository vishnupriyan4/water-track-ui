import { SET_USER_DETAILS, EDIT_NOTIFICATION_DETAILS, SET_JWT } from './types';
import axiosWrapper from '../../../../apis/axiosCreate';
// import axios from 'axios';

export const setUserDetails = (userId, jwt) => async (dispatch) => {
    await axiosWrapper.get(`users/findUser/`, { headers: { Authorization: `JWT ${jwt}` }}).then(resp =>
        dispatch({
            type: SET_USER_DETAILS,
            payload: resp.data
        })
    );
}

export const editUserDetails = (updateObject) => (dispatch) => {
    dispatch({
        // type: EDIT_NOTIFICATION_DETAILS,
        type: SET_USER_DETAILS,
        payload: updateObject
    })
}

export const setJwt = (jwt) => (dispatch) => {
    dispatch({
        type: SET_JWT,
        payload: jwt
    })
}
