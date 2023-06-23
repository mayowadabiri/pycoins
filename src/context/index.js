import { createContext, useReducer } from "react";

import appReducer from "./reducer";

const initialState = {
  register: false,
  profile: {},
  initials: null,
  fullname: "",
  apiKeys: {},
  environment: "",
  settlements: [],
};
export const AppContext = createContext(initialState);

const AppComponent = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const changeToRegister = () => {
    dispatch({
      type: "CHECK_REGISTER",
    });
  };

  const saveUser = (data) => {
    let payload = {};
    if (data.user) payload = data;
    else {
      payload = {
        ...data,
        business: {
          ...data.business,
          user: null,
        },
        user: {
          ...data.business.user,
        },
      };
    }

    dispatch({
      type: "SAVE_USER",
      payload: payload,
    });
  };

  const logoutUser = () => {
    dispatch({
      type: "LOGOUT_USER",
    });
  };

  const saveApiKeys = (data) => {
    dispatch({
      type: "SAVE_API_KEYS",
      payload: data,
    });
  };
  const switchBusiness = () => {
    dispatch({
      type: "SWITCH_TO_BUSINESS",
    });
  };

  const saveUserEnvironment = (data) => {
    dispatch({
      type: "SAVE_ENVIRONMENT",
      payload: data,
    });
  };

  const saveSettlements = (data) => {
    const settlements = [];
    for (let key in data) {
      settlements.push({
        key,
        ...data[key],
      });
    }
    dispatch({
      type: "SAVE_SETLLEMENT",
      payload: settlements,
    });
  };
  const contextValue = {
    ...state,
    changeToRegister,
    saveUser,
    logoutUser,
    switchBusiness,
    saveApiKeys,
    saveUserEnvironment,
    saveSettlements,
    state: state,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppComponent;
