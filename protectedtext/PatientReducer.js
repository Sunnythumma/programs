import axios from "axios";
import { GET_PATIENT_PROFILE } from "../actionTypes";
import baseUrl from "../../utils/baseUrl";

export const patientProfile = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseUrl}/user/userProfile`, {
        headers: {
          Authorization: token,
        },
      });
      // console.log("patient response in api---", response.data.data);
      dispatch(getPatientProfile(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const profileEdit = (profile) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${baseUrl}/user/updateProfile`,
        profile,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(("profile edit in api --", response));
      dispatch(patientProfile());
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPatientProfile = (patientProfile) => {
  return {
    type: GET_PATIENT_PROFILE,
    payload: patientProfile,
  };
};



import { GET_PATIENT_PROFILE } from "../actionTypes";

const initialState = {
  patientProfileData: {},
};

const PatientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PATIENT_PROFILE:
      return {
        ...state,
        patientProfileData: action.payload,
      };    

    default:
      return state;
  }
};

export default PatientReducer;
