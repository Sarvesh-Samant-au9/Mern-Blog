import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  USER_LOADED,
  REGISTER_FAILURE,
  LOGIN_FAILURE,
  LOGOUT,
  AUTH_FAIL,
  CLEAR_ERROR,
} from "../actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: payload.user,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload);
      return {
        ...state,
        token: payload,
        isLoading: false,
        isAuthenticated: true,
      };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case LOGOUT:
    case AUTH_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
