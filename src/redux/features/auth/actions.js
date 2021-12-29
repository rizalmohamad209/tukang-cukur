import { SIGNIN_FAIL, SIGNIN_SUCCESS } from "./constants";
import AuthDataService from "../../../api/auth";
export const signin = (data) => {
  return async (dispatch) => {
    dispatch({
      type: SIGNIN_SUCCESS,
      user: data.data.data,
    });
  };
};
