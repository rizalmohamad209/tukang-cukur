import { SIGNIN_FAIL, SIGNIN_SUCCESS } from "./constants";
const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.user,
      };
    default:
      return state;
  }
}
