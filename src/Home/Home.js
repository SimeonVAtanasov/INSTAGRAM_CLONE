import Post from "../Post/Post";
import ProfileSection from "../ProfileSection/ProfileSection";
import { useSelector } from "react-redux";

import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";

export default function Home() {
  const currentUser = useSelector(state => state.currentUser.user)
  const posts = useSelector((state) => state.posts.posts);
  const [filteredPosts, setFilteredPosts] = useState([]);


  useEffect(() => {
    const arr = posts.filter(({ post }) => currentUser.following.includes(post.createdBy) || post.createdBy === currentUser.uid);
    setFilteredPosts(arr);

  }, [currentUser,  posts])



  if (filteredPosts.length) {
    return (
      <div className={styles.home_page}>
        <div className={styles.home_posts}>
          {filteredPosts.map(({ id, post }) => (
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
              savedBy = {post.savedBy}
            />
          ))}
        </div>

        <ProfileSection/>

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
