import { db } from "../firebase";
export const FETCH_POSTS_UPDATED = "FETCH_POSTS_UPDATED";
export const FETCH_POSTS_FAILED = "FETCH_POSTS_FAILED";
export const FETCH_POSTS_REQUESTED = "FETCH_POSTS_REQUESTED";
export const FETCH_POSTS_ADDED = "FETCH_POSTS_ADDED";

export const fetchPostsUpdated = (posts) => ({
  type: FETCH_POSTS_UPDATED,
  payload: posts,
});

export const fetchPostsFailed = (err) => ({
  type: FETCH_POSTS_FAILED,
  payload: err,
});

export const fetchPostsRequested = () => ({
  type: FETCH_POSTS_REQUESTED,
});

export const fetchPostAdded = (post) => ({
  type: FETCH_POSTS_ADDED,
  payload: post,
});



export const subscribeToRealTimeEvents = () => {
  return function (dispatch) {
      dispatch(fetchPostsRequested());
       db.collection("posts")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          dispatch(
            fetchPostsUpdated(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                post: doc.data(),
              }))
            )
          );
        });
        
    }
    
};

