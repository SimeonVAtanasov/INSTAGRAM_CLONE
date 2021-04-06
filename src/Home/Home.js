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
  const perPage = 3;

  const loadHomePagePosts = () => {
    let endPosition = postsToShow.length + perPage

    if (endPosition > filteredPosts.length) {
      endPosition = filteredPosts.length;
    }


    let arr = filteredPosts.slice(postsToShow.length, endPosition)

    setTimeout(() => {
      let arrtoSet = [...postsToShow, ...arr]
      setPostsToShow(arrtoSet)
      if (endPosition >= filteredPosts.length - 1) {
        setHasmore(false)
      }
    }, 1200);

  }

  useEffect(() => {
    if (currentUser.uid.length) {
      const arr = posts.filter(({ post }) => currentUser.following.includes(post.createdBy) || post.createdBy === currentUser.uid);
      setFilteredPosts(arr);
      if (!postsToShow.length) {
        setPostsToShow(arr.slice(0, perPage))
      } 
    }
  }, [currentUser, posts])

  const refresh = ()=>{
    const arr = posts.filter(({ post }) => currentUser.following.includes(post.createdBy) || post.createdBy === currentUser.uid);
    setFilteredPosts(arr);
      setPostsToShow(arr.slice(0, perPage))
      setHasmore(true)
  }

  if (filteredPosts.length) {
    return (
      <div className={styles.home_page}>
        <InfiniteScroll
          dataLength={postsToShow.length}
          next={loadHomePagePosts}
          hasMore={hasMore}
          endMessage={
            <p className={styles.refresh}>
              <b>~ Yay! You have seen it all ~</b>
            </p>
          }
          loader={<h4>~ Loading... ~</h4>}
          refreshFunction={refresh}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 className={styles.refresh}>&#8595; Keep pulling ~</h3>
          }
          releaseToRefreshContent={
            <h3 className={styles.refresh}>&#8593; Release to refresh  ~</h3>
          }
        >
          <div className={styles.home_posts}>
            <h5 className={styles.refresh}>~ pull down to refresh ~</h5>
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
