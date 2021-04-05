import Post from "../Post/Post";
import ProfileSection from "../ProfileSection/ProfileSection";
import { useSelector } from "react-redux";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import InfiniteScroll from 'react-infinite-scroll-component'

export default function Home() {
  const currentUser = useSelector(state => state.currentUser.user)
  const posts = useSelector((state) => state.posts.posts);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [postsToShow, setPostsToShow] = useState([]);
  const [hasMore, setHasmore] = useState(true)
  const [lastPosition, setLastPosition] = useState(0)  // to remove
  const perPage = 2;

  const loadHomePagePosts = () => {
    let endPosition = postsToShow.length + perPage

    if (endPosition > filteredPosts.length) {
      endPosition = filteredPosts.length - 1;
    }


    let arr = filteredPosts.slice(lastPosition, endPosition)

    setTimeout(() => {
      let arrtoSet = [...postsToShow, ...arr]
      setPostsToShow(arrtoSet)
      setLastPosition(arrtoSet.length - 1)
      if (endPosition >= filteredPosts.length - 1) {
        setHasmore(false)
      }
    }, 1200);

  }

  useEffect(() => {
    if (currentUser.uid.length) {
      const arr = posts.filter(({ post }) => currentUser.following.includes(post.createdBy) || post.createdBy === currentUser.uid);
      setFilteredPosts(arr);
      setPostsToShow(arr.slice(0, perPage)) // to  remove
      setLastPosition(perPage)
    }

  }, [currentUser, posts])

  if (filteredPosts.length) {
    return (
      <div className={styles.home_page}>
        <InfiniteScroll
          dataLength={postsToShow.length}
          next={loadHomePagePosts}
          hasMore={hasMore}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          loader={<h4>Loading...</h4>}
        >
          <div className={styles.home_posts}>
            {postsToShow.map(({ id, post }) => (
              <Post
                key={id}
                postId={id}
                username={post.username}
                caption={post.caption}
                imageUrl={post.imageUrl}
                likedBy={post.likedBy}
                time={post.timestamp}
                userPhoto={post.userPhoto}
                uid={post.createdBy}
                savedBy={post.savedBy}
              />
            ))}
          </div>
        </InfiniteScroll>
        <ProfileSection />

      </div>
    );

  } else {
    return (
      <div className={styles.home_page}>
        <div className={styles.home_posts}>
          <div className={styles.message}>
            To  see posts on your 300gram's feed please search for users and follow them or go to
            <Link to="/explore">
              Еxplore<ExploreOutlinedIcon style={{ fontSize: 26 }} />
            </Link>
          </div>
        </div>

        <ProfileSection />
      </div>)
  }

}
