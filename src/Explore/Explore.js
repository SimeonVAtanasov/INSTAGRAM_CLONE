import ExplorePost from "./ExplorePost/ExplorePost.js";
import styles from "./Explore.module.scss";
import { useSelector } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component'
import { useEffect, useState } from "react";


export default function Explore() {
  const posts = useSelector(state => state.posts.posts);
  const [postsToShow, setPostsToShow] = useState([]);

  const [hasMore, setHasmore] = useState(true)
  const [lastPosition, setLastPosition] = useState(0)
  const perPage = 9;

  const loadExplorePagePosts = () => {
    let endPosition = postsToShow.length  + perPage
    console.log("🚀 ~ file: Explore.js ~ line 18 ~ loadExplorePagePosts ~ endPosition", endPosition)

    if (endPosition > posts.length) {
      endPosition = posts.length - 1;
    }

    let arr = posts.slice(lastPosition, endPosition)

    setTimeout(() => {
      let arrtoSet = [...postsToShow, ...arr]
      setPostsToShow(arrtoSet)
      setLastPosition(arrtoSet.length - 1)
      if (endPosition >= posts.length - 1) {
        setHasmore(false)
      }
    }, 1200);

  }

  useEffect(() => {
    setPostsToShow(posts.slice(0, perPage))
    setLastPosition(perPage)

  }, [posts])
  return (
    <>
      <InfiniteScroll
        dataLength={postsToShow.length}
        next={loadExplorePagePosts}
        hasMore={hasMore}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
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
