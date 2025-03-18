import { SET_CONTENT_TYPE, SET_TRENDING_CONTENT } from "../constants/actionTypes";

const initialState = {
  contentType: "movie", // Default content type
  trendingContent: [], // Store trending content here
};

const contentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTENT_TYPE:
      return {
        ...state,
        contentType: action.payload,
      };

    case SET_TRENDING_CONTENT:
      return {
        ...state,
        trendingContent: action.payload,
      };

    default:
      return state;
  }
};

export default contentReducer;
