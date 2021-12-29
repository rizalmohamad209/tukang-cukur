import {
  START_FETCHING_MITRA,
  SUCCESS_FETCHING_MITRA,
  ERROR_FETCHING_MITRA,
  ADD_MITRA,
  EDIT_MITRA,
  DELETE_MITRA,
} from "./constants";
import MitraDataService from "../../../api/mitra";
import Mitra from "../../../pages/Mitra";

export const postMitra = (data) => {
  return async (dispatch) => {
    // let fix = JSON.stringify(data);
    // console.log("post data", fix);

    const res = await MitraDataService.postMitra(data);
    console.log(res);
    dispatch({
      type: ADD_MITRA,
      data: res.data,
    });
    console.log("response", res);
  };
};

export const updateMitra = (id, data) => {
  return async (dispatch) => {
    const res = await MitraDataService.update(id, data);
    console.log(res);
    dispatch({
      type: EDIT_MITRA,
    });
    console.log("response", res);
  };
};

export const deleteMitra = (id) => {
  return async (dispatch) => {
    const res = await MitraDataService.delete(id);
    console.log(res);
    dispatch({
      type: DELETE_MITRA,
    });
  };
};

export const startFetchingMitra = () => {
  return {
    type: START_FETCHING_MITRA,
  };
};

export const fetchingMitra = () => {
  return async (dispatch) => {
    dispatch(startFetchingMitra());

    const res = await MitraDataService.getAll();
    try {
      console.log("all mitra", res);
      dispatch(successFetchingMitra(res.data.data));
    } catch (e) {
      dispatch(errorFetchingMitra());
    }
  };
};

export const successFetchingMitra = (data) => {
  return {
    type: SUCCESS_FETCHING_MITRA,
    data,
  };
};

export const errorFetchingMitra = () => {
  return {
    type: ERROR_FETCHING_MITRA,
  };
};
