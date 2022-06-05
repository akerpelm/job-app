import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_INITIATE,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_INITIATE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  AUTHENTICATE_USER_INITIATE,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_ERROR,
} from "./actions";

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
    default:
      throw new Error(`No such action: ${action.type}`);
  }
  // case REGISTER_USER_INITIATE: {
  //   return {
  //     ...state,
  //     isLoading: true,
  //   };
  // }

  // case REGISTER_USER_SUCCESS: {
  //   const { user, token, location } = action.payload;
  //   return {
  //     ...state,
  //     user,
  //     token,
  //     userLocation: location,
  //     jobLocation: location,
  //     isLoading: false,
  //     showAlert: true,
  //     alertType: "success",
  //     alertText: "User Created. Redirecting...",
  //   };
  // }
  // case REGISTER_USER_ERROR: {
  //   return {
  //     ...state,
  //     showAlert: true,
  //     alertType: "danger",
  //     alertText: action.payload.msg,
  //   };
  // }
  // case LOGIN_USER_INITIATE: {
  //   return {
  //     ...state,
  //     isLoading: true,
  //   };
  // }
  // case LOGIN_USER_SUCCESS: {
  //   const { user, token, location } = action.payload;
  //   return {
  //     ...state,
  //     user,
  //     token,
  //     userLocation: location,
  //     jobLocation: location,
  //     isLoading: false,
  //     showAlert: true,
  //     alertType: "success",
  //     alertText: "Login successful. Redirecting...",
  //   };
  // }
  // case LOGIN_USER_ERROR: {
  //   return {
  //     ...state,
  //     isLoading: false,
  //     showAlert: true,
  //     alertType: "danger",
  //     alertText: action.payload.msg,
  //   };
  // }
};

export default reducer;
