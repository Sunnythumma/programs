import axios from "axios";
import { INVALID_CREDENTIALS, LOGIN, LOGOUT } from "../actionTypes";
import baseUrl from "../../utils/baseUrl";

export const login = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        email: user.email,
        password: user.password,
      });      
      const token = response.data.data.token;
      localStorage.setItem("token", token);
      dispatch(setLogin(true));
    } catch (error) {
      dispatch(setInvalidCredentials(true));
    }
  };
};

export const setInvalidCredentials = (invalid) => {
  return {
    type: INVALID_CREDENTIALS,
    payload: invalid,
  };
};

export const setLogin = (login) => {
  return {
    type: LOGIN,
    payload: login,
  };
};

export const setLogout = () => {
  return {
    type: LOGOUT,
  };
};



import { LOGIN, INVALID_CREDENTIALS, LOGOUT } from "../actionTypes";
// const token = localStorage.getItem("token");

const initialState = {
  // isLogin : false,
  isLogin: localStorage.getItem("token"),
  invalidCredentials: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLogin: action.payload, invalidCredentials: false };
    case LOGOUT:
      return { ...state, isLogin: null };
    case INVALID_CREDENTIALS:
      return { ...state, invalidCredentials: action.payload, isLogin: false };
    default:
      return state;
  }
};

export default userReducer;
