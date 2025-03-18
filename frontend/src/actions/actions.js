import axios from "axios";
import toast from "react-hot-toast";
import { 
  SET_USER, 
  SET_IS_SIGNING_UP, 
  SET_IS_LOGGING_IN, 
  SET_IS_LOGGING_OUT, 
  SET_IS_CHECKING_AUTH, 
  SET_CONTENT_TYPE ,
  //SET_TRENDING_CONTENT
} from '../constants/actionTypes';

// authUser actions
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setIsSigningUp = (isSigningUp) => ({
  type: SET_IS_SIGNING_UP,
  payload: isSigningUp,
});

export const setIsLoggingIn = (isLoggingIn) => ({
  type: SET_IS_LOGGING_IN,
  payload: isLoggingIn,
});

export const setIsLoggingOut = (isLoggingOut) => ({
  type: SET_IS_LOGGING_OUT,
  payload: isLoggingOut,
});

export const setIsCheckingAuth = (isCheckingAuth) => ({
  type: SET_IS_CHECKING_AUTH,
  payload: isCheckingAuth,
});

// content actions
export const setContentType = (contentType) => ({
  type: SET_CONTENT_TYPE,
  payload: contentType,
});



// authUser async actions
export const signup = (credentials) => async (dispatch) => {
  dispatch(setIsSigningUp(true));
  try {
    const response = await axios.post("/api/v4/auth/signup", credentials);
    dispatch(setUser(response.data.user));
    dispatch(setIsSigningUp(false));
    toast.success("Account created successfully");
  } catch (error) {
    dispatch(setIsSigningUp(false));
    dispatch(setUser(null));
    toast.error(error.response?.data?.message || "Signup failed");
  }
};

export const login = (credentials) => async (dispatch) => {
  dispatch(setIsLoggingIn(true));
  try {
    const response = await axios.post("/api/v4/auth/login", credentials, { withCredentials: true });
    dispatch(setUser(response.data.user));
    dispatch(setIsLoggingIn(false));
  } catch (error) {
    dispatch(setIsLoggingIn(false));
    dispatch(setUser(null));
    toast.error(error.response?.data?.message || "Login failed");
  }
};

export const logout = () => async (dispatch) => {
  dispatch(setIsLoggingOut(true));
  try {
    await axios.post("/api/v4/auth/logout");
    dispatch(setUser(null));
    dispatch(setIsLoggingOut(false));
    toast.success("Logged out successfully");
  } catch (error) {
    dispatch(setIsLoggingOut(false));
    toast.error(error.response?.data?.message || "Logout failed");
  }
};

export const authCheck = () => async (dispatch) => {
  dispatch(setIsCheckingAuth(true));
  try {
    const response = await axios.get("/api/v4/auth/authCheck", { withCredentials: true });
    
    console.log("AuthCheck Response:", response.data); // Check what the backend is returning
    
    dispatch(setUser(response.data.user)); 
    dispatch(setIsCheckingAuth(false));
  } catch (error) {
    console.error("AuthCheck Error:", error.response?.data || error);
    dispatch(setIsCheckingAuth(false));
    dispatch(setUser(null));
  }
};




// export const setTrendingContent = () => async (dispatch) => {
//   try {
//     const response = await axios.get("/api/v4/movie/trending");
//     console.log(response)
//     dispatch({
//       type: SET_TRENDING_CONTENT,
//       payload: response.data, // Ensure response.data contains an array
//     });
//   } catch (error) {
//     console.error("Error fetching trending content:", error);
//   }
// };

