import { SET_BLUE_THEME } from './types';

export const setBlueTheme = (themeVal) => (dispatch) => {
    dispatch({
        type: SET_BLUE_THEME,
        payload: themeVal
    })
}