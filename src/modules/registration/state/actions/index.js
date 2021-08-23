import { SET_ID } from './types';
import axiosWrapper from '../../../../apis/axiosCreate';
import localForage from 'localforage';

export const setUserId = (userDetails, subscriptionObj) => async (dispatch) => {
    const resp = await axiosWrapper.post(`/users/addUser`, {...userDetails, subscription: subscriptionObj})
        await localForage.setItem('userAuthId', resp.data.userId);
        await localForage.setItem('jwtToken', resp.data.jwt);
            dispatch ({
                type: SET_ID,
                payload: resp.data.userId
            })
}

export const setUserIdLocal = (id) => async (dispatch) => {
    await dispatch({
        type: SET_ID,
        payload: id
    })
}
