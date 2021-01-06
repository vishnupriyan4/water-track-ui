import { DELETE_WATER } from './types';
import { SET_USER_DETAILS } from '../../../landing/state/actions/types';
import axiosWrapper from '../../../../apis/axiosCreate';

export const deleteWaterEntry = (jwtToken, waterId) => async (dispatch) => {
    await axiosWrapper.delete(`/users/updateUser/waterDetailsDelete/`, {headers: {Authorization: `JWT ${jwtToken}`}, params: {waterId: waterId}}).then(resp => {
        dispatch({
            type: SET_USER_DETAILS,
            payload: resp.data
        })
    })
}