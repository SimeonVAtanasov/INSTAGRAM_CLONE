import ExplorePost from "./ExplorePost/ExplorePost.js";
import styles from "./Explore.module.scss";
import { useSelector } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component'
import { useState } from "react";

export default function Explore() {
  debugger
  const posts = useSelector(state => state.posts.posts);
  const perPage = 9;
  const [postsToShow, setPostsToShow] = useState(posts.slice(0, perPage));

  const [hasMore, setHasmore] = useState(true)

  const loadExplorePagePosts = () => {
    let endPosition = postsToShow.length + perPage;

    if (endPosition > posts.length) {
      endPosition = posts.length;
    }

    let arr = posts.slice(postsToShow, endPosition)

    setTimeout(() => {
      let arrtoSet = [...postsToShow, ...arr]
      setPostsToShow(arrtoSet)
      if (endPosition >= posts.length - 1) {
        setHasmore(false);
      }
    }, 1200);

  }
 
  return (
    <>
      <InfiniteScroll
        dataLength={postsToShow.length}
        next={loadExplorePagePosts}
        hasMore={hasMore}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
      >
        <div className={styles.exploreContainer}>
          {postsToShow.map(({ id, post }) => (
            <ExplorePost key={id} post={post} id={id} uid={post.createdBy} />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}
