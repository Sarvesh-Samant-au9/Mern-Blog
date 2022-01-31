import axios from "axios";
import authContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import setAuthToken from "../../Utils/setAuthToken";
import React, { useReducer } from "react";
import {
  AUTH_FAIL,
  USER_LOADED,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CLEAR_ERROR,
  LOGOUT,
} from "../actionTypes";

const AuthState = (props) => {
  const initialState = {
    isLoading: true,
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    user: null,
    error: null,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const { data } = await axios.get("/api/auth");
      console.log(data);
      dispatch({
        type: USER_LOADED,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: AUTH_FAIL,
      });
    }
  };

  // Register User Function
  const registerUser = async (userData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post("/api/auth/register", userData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: data.data.token,
      });
      // console.log(data.data.token, "Data is Here");
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({
        type: REGISTER_FAILURE,
        payload: error.response.data.message,
      });
    }
  };

  const loginUser = async (userData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post("/api/auth/login", userData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.response.data.message,
      });
    }
  };

  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERROR,
    });
  };

  const logoutUser = async () => {
    // setAuthToken();
    dispatch({
      type: LOGOUT,
    });
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        user: state.user,
        error: state.error,
        registerUser,
        loginUser,
        loadUser,
        logoutUser,
        clearErrors,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
