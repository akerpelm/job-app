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
      debugger;
      return {
        ...initialState,
        [name]: value,
      };
    }
    default:
      throw new Error(`No such action: ${action.type}`);
  }
};

export default reducer;
