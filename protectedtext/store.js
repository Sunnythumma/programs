import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import PatientReducer from "./reducers/patientReducer";
import viewReducer from "./reducers/viewReducer";

const rootReducer = combineReducers({
  user: userReducer,
  patient: PatientReducer,
  view: viewReducer,
});

// const store = createStore(userReducer,applyMiddleware(thunk))

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;



import axios from "axios";
import {
  GET_ALL_PATIENTS,
  GET_ALL_DONORS,
  GET_ALL_REQUESTS,
  GET_ALL_HOSPITALS,
  GET_ALL_USERS,
} from "../actionTypes";
import baseUrl from "../../utils/baseUrl";

export const getPatients = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseUrl}/user/showPatients`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("patient response in api---", response.data.data);
      dispatch(viewPatients(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDonors = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseUrl}/user/showDoners`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("donor response in api---", response.data.data);
      dispatch(viewDonors(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getRequests = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseUrl}/request`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("request response in api 1 ---", response.data.data);
      dispatch(viewRequests(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getHospitals = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseUrl}/hospital`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("hospital response in api---", response.data.data);
      dispatch(viewHospitals(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllUsers = (currentPage) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${baseUrl}/user?page=${currentPage}&pageSize=10`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("All users response in api---", response.data.data);
      dispatch(viewAllUsers(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const viewAllUsers = (viewAllUsers) => {
  return {
    type: GET_ALL_USERS,
    payload: viewAllUsers,
  };
};

export const viewPatients = (viewPatients) => {
  return {
    type: GET_ALL_PATIENTS,
    payload: viewPatients,
  };
};

export const viewDonors = (viewDonors) => {
  return {
    type: GET_ALL_DONORS,
    payload: viewDonors,
  };
};

export const viewRequests = (viewRequests) => {
  return {
    type: GET_ALL_REQUESTS,
    payload: viewRequests,
  };
};

export const viewHospitals = (viewHospitals) => {
  return {
    type: GET_ALL_HOSPITALS,
    payload: viewHospitals,
  };
};



import {
  GET_ALL_PATIENTS,
  GET_ALL_DONORS,
  GET_ALL_REQUESTS,
  GET_ALL_HOSPITALS,
  GET_ALL_USERS,
} from "../actionTypes";

const initialState = {
  viewPatients: [],
  viewDonors: [],
  viewRequests: [],
  viewHospitals: [],
  viewAllUsers: [],
};

const viewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PATIENTS:
      return {
        ...state,
        viewPatients: action.payload,
      };
    case GET_ALL_DONORS:
      return {
        ...state,
        viewDonors: action.payload,
      };
    case GET_ALL_REQUESTS:
      return {
        ...state,
        viewRequests: action.payload,
      };
    case GET_ALL_HOSPITALS:
      return {
        ...state,
        viewHospitals: action.payload,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        viewAllUsers: action.payload,
      };
    default:
      return state;
  }
};

export default viewReducer;
