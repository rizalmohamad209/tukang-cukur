import {
  START_FETCHING_MITRA,
  SUCCESS_FETCHING_MITRA,
  ERROR_FETCHING_MITRA,
  ADD_MITRA,
} from "./constants";

const statusList = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  data: [],
  status: statusList.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_MITRA:
      return {
        ...state,
        status: statusList.process,
      };
    case ERROR_FETCHING_MITRA:
      return {
        ...state,
        status: statusList.error,
      };
    case SUCCESS_FETCHING_MITRA:
      return {
        ...state,
        data: action.data,
        status: statusList.success,
      };
    case ADD_MITRA:
      return {
        ...state,
      };
    default:
      return state;
  }
}
