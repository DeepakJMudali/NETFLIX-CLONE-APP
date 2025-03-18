import { SET_USER, SET_IS_SIGNING_UP, SET_IS_LOGGING_IN, SET_IS_LOGGING_OUT, SET_IS_CHECKING_AUTH } from '../constants/actionTypes';

const initialState = {
  user: null,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isCheckingAuth: true,
};

const authUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_IS_SIGNING_UP:
      return { ...state, isSigningUp: action.payload };
    case SET_IS_LOGGING_IN:
      return { ...state, isLoggingIn: action.payload };
    case SET_IS_LOGGING_OUT:
      return { ...state, isLoggingOut: action.payload };
    case SET_IS_CHECKING_AUTH:
      return { ...state, isCheckingAuth: action.payload };
    default:
      return state;
  }
};

export default authUserReducer;
