import { AUTHENTICATION, LOGOUT } from "../constants/actionTypes";
const authenticationReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTHENTICATION:
            console.log("action", action)
            localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
            return {
                ...state,
                authData: action?.data
            }
        case LOGOUT:
            localStorage.clear();
            return {
                ...state,
                authData: null
            }
        default:
            return state;

    }
};
export default authenticationReducer;