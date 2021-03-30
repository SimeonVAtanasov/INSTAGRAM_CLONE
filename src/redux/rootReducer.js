import { combineReducers } from 'redux';
import postsReducer from "../Post/Posts.reducer"

const rootReducer = combineReducers({
    posts: postsReducer, 

});

export default rootReducer;