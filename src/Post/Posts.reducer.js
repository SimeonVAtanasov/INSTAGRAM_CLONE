import {
  FETCH_POSTS_FAILED,
  FETCH_POSTS_REQUESTED,
  FETCH_POSTS_UPDATED,
  FETCH_POSTS_ADDED,
} from "./Posts.actions";

const INITIAL_STATE = {
  posts: [],
  error: null,
  isLoading: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUESTED:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_POSTS_UPDATED:
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
        error: null,
      };

    case FETCH_POSTS_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case FETCH_POSTS_ADDED:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };

    default:
      return state;
  }
};

export default reducer;
