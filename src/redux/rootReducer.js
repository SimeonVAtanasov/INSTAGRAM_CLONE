import { combineReducers } from 'redux';
import postsReducer from "../Post/Posts.reducer"
import currentUserReducer from "../CurrentUser.reducer"
const rootReducer = combineReducers({
    posts: postsReducer, 

    currentUser:currentUserReducer,
});

export default rootReducer;