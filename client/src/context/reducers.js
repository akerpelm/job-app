import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  AUTHENTICATE_USER_INITIATE,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_INITIATE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_INITIATE,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_INITIATE,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_INITIATE,
  EDIT_JOB_INITIATE,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
} from "./actions";
import { initialState } from "./appContext";

const reducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT: {
      return {
        ...state,
        showAlert: true,
        alertType: "danger",
        alertText: "Please provide all values.",
      };
    }
    case CLEAR_ALERT: {
      return {
        ...state,
        showAlert: false,
        alertType: "",
        alertText: "",
      };
    }
    case AUTHENTICATE_USER_INITIATE: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case AUTHENTICATE_USER_SUCCESS: {
      const { user, token, location, alertText } = action.payload;
      return {
        ...state,
        user,
        token,
        userLocation: location,
        jobLocation: location,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText,
      };
    }
    case AUTHENTICATE_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    }
    case UPDATE_USER_INITIATE: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UPDATE_USER_SUCCESS: {
      const { user, token, location } = action.payload;
      return {
        ...state,
        user,
        token,
        userLocation: location,
        jobLocation: location,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "Profile updated.",
      };
    }
    case UPDATE_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    }

    case LOGOUT_USER: {
      return {
        ...state,
        user: null,
        token: null,
        userLocation: "",
        jobLocation: "",
      };
    }
    case TOGGLE_SIDEBAR: {
      return {
        ...initialState,
        showSidebar: !state.showSidebar,
      };
    }
    case HANDLE_CHANGE: {
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      };
    }
    case CLEAR_VALUES: {
      const initialState = {
        isEditing: false,
        editJobId: "",
        position: "",
        company: "",
        jobType: "Full-Time",
        jobStatus: "Application Pending",
        jobLocation: state.userLocation,
      };
      return { ...state, ...initialState };
    }
    case CREATE_JOB_INITIATE: {
      return { ...state, isLoading: true };
    }
    case CREATE_JOB_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "Job entered successfully",
      };
    }
    case CREATE_JOB_ERROR: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    }

    case GET_JOBS_INITIATE: {
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };
    }

    case GET_JOBS_SUCCESS: {
      const { jobs, totalJobs, pages } = action.payload;
      return {
        ...state,
        isLoading: false,
        jobs,
        totalJobs,
        pages,
      };
    }

    case SET_EDIT_JOB: {
      const { _id, position, company, jobType, jobStatus, jobLocation } =
        state.jobs.find((job) => job._id === action.payload.id);

      return {
        ...state,
        editJobId: _id,
        position,
        company,
        jobType,
        jobStatus,
        jobLocation,
        isEditing: true,
      };
    }
    case EDIT_JOB_INITIATE: {
      return { ...state, isLoading: true };
    }
    case EDIT_JOB_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "Job updated successfully",
      };
    }
    case EDIT_JOB_ERROR: {
      return {
        ...state,
        showAlert: true,
        alertType: "danger",
        alertText: action.payload.msg,
      };
    }
    case DELETE_JOB_INITIATE: {
      return { ...state, isLoading: true };
    }
    default:
      throw new Error(`No such action: ${action.type}`);
  }
};

export default reducer;
