import React, { useReducer, useContext } from "react";
import axios from "axios";
import reducer from "./reducers";
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
  GET_JOBS_SUCCESS,
  GET_JOBS_INITIATE,
  SET_EDIT_JOB,
  DELETE_JOB_INITIATE,
  EDIT_JOB_INITIATE,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  GET_JOB_STATS_INITIATE,
  GET_JOB_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE
} from "./actions";
import {
  jobTypeOptions,
  jobStatusOptions,
  sortOptions
} from "./contextConstants";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  showSidebar: false,
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobTypeOptions,
  jobType: "Full-Time",
  jobStatusOptions,
  jobStatus: "Application Pending",
  jobLocation: userLocation || "",
  jobs: [],
  totalJobs: 0,
  pages: 1,
  currentPage: 1,
  jobStats: {},
  monthlyApplications: [],
  search: "",
  searchJobStatus: "all",
  searchJobType: "all",
  sort: "newest",
  sortOptions
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Axios Sandbox
  const authFetch = axios.create({
    baseURL: "/api/v1"
  });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        logoutCurrentUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const persistUserDataToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  const removeUserDataFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
  };

  const authenticateUser = async ({ currentUser, authMethod, alertText }) => {
    dispatch({ type: AUTHENTICATE_USER_INITIATE });
    try {
      const { data } = await axios.post(
        `api/v1/auth/${authMethod}`,
        currentUser
      );
      const { user, token, location } = data;
      dispatch({
        type: AUTHENTICATE_USER_SUCCESS,
        payload: {
          alertText,
          user,
          token,
          location
        }
      });
      persistUserDataToLocalStorage({ user, token, location });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: AUTHENTICATE_USER_ERROR,
        payload: { msg: error.response.data.msg }
      });
    }
    clearAlert();
  };

  const logoutCurrentUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserDataFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_INITIATE });
    try {
      const {
        data: { user, token, location }
      } = await authFetch.patch("/auth/updateUser", currentUser);

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token, location }
      });
      persistUserDataToLocalStorage({ user, token, location });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg }
        });
      }
    }
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value }
    });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createJob = async () => {
    dispatch({ type: CREATE_JOB_INITIATE });
    try {
      const { position, company, jobLocation, jobType, jobStatus } = state;

      await authFetch.post("/jobs", {
        company,
        position,
        jobLocation,
        jobType,
        jobStatus
      });
      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.message }
      });
    }
    clearAlert();
  };

  const getJobs = async () => {
    const { searchJobStatus, searchJobType, sort, search, currentPage } = state;
    let url = `/jobs?page=${currentPage}&jobStatus=${searchJobStatus}&jobType=${searchJobType}&sort=${sort}`;
    if (search) {
      url += `&search=${search}`;
    }
    dispatch({ type: GET_JOBS_INITIATE });
    try {
      const { data } = await authFetch(url);
      const { jobs, totalJobs, pages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          pages
        }
      });
    } catch (error) {
      console.log(error.response);
      logoutCurrentUser();
    }
    clearAlert();
  };

  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };

  const editJob = async () => {
    dispatch({ type: EDIT_JOB_INITIATE });
    try {
      const { position, company, jobLocation, jobType, jobStatus, editJobId } =
        state;
      await authFetch.patch(`jobs/${editJobId}`, {
        position,
        company,
        jobLocation,
        jobType,
        jobStatus
      });
      dispatch({ type: EDIT_JOB_SUCCESS });
      clearAlert();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg }
      });
    }
  };
  const deleteJob = async (id) => {
    dispatch({ type: DELETE_JOB_INITIATE });
    try {
      await authFetch.delete(`jobs/${id}`);
      getJobs();
    } catch (error) {
      console.log(error.response);
      logoutCurrentUser();
    }
    clearAlert();
  };

  const getJobStats = async () => {
    dispatch({ type: GET_JOB_STATS_INITIATE });
    try {
      const {
        data: { jobsByStatus, monthlyApplications }
      } = await authFetch.get("jobs/stats");
      dispatch({
        type: GET_JOB_STATS_SUCCESS,
        payload: {
          jobStats: jobsByStatus,
          monthlyApplications
        }
      });
    } catch (error) {
      console.log(error);
      logoutCurrentUser();
    }
    clearAlert();
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        authenticateUser,
        toggleSidebar,
        logoutCurrentUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        editJob,
        deleteJob,
        getJobStats,
        clearFilters,
        changePage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
