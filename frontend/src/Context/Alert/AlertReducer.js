import { CLEAR_ALERT, SET_ALERT } from "../actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return {
        ...state,
        alert: payload,
      };
    case CLEAR_ALERT:
      return {
        ...state,
        alert: null,
      };
    default:
      return state;
  }
};
