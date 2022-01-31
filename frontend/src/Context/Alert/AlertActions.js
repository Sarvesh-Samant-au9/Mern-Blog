import { useReducer } from "react";
import { CLEAR_ALERT, SET_ALERT } from "../actionTypes";
import alertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";

const AlertState = (props) => {
  const initialState = {
    alert: null,
  };
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = (message, type, timeout = 2000) => {
    dispatch({
      type: SET_ALERT,
      payload: { message, type },
    });
    setTimeout(() => dispatch({ type: CLEAR_ALERT }), timeout);
  };

  return (
    <alertContext.Provider
      value={{
        alert: state.alert,
        setAlert,
      }}
    >
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertState;
