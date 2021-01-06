import { SET_BLUE_THEME } from '../actions/types';
let themeVal;
const existingThemeVal = window.localStorage.getItem('blueTheme');
if (existingThemeVal === "true") {
    themeVal = true;
} else if (existingThemeVal === "false") {
    themeVal = false;
} else {
    themeVal = true;
}
const INITIAL_STATE = {
    blueTheme: themeVal
}

const themeReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_BLUE_THEME :
            window.localStorage.setItem('blueTheme', action.payload);
            state = {...state, blueTheme: action.payload};
            break;
        default : 
            state = {
                ...state
            }
    }
    return state;
}

export default themeReducer;