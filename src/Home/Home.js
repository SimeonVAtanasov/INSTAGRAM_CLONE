import Post from "../Post/Post";
import ProfileSection from "../ProfileSection/ProfileSection";
import { useSelector } from "react-redux";

import styles from "./Home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const currentUser = useSelector(state => state.currentUser.user)
  const posts = useSelector((state) => state.posts.posts);
  const [filteredPosts, setFilteredPosts] = useState([]);

  
  useEffect(() => {
    const arr = posts.filter(({ post }) => currentUser.following.includes(post.createdBy) || post.createdBy === currentUser.uid);
    setFilteredPosts(arr);

  }, [currentUser])


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
            uid={post.uid}
          ></Post>
        ))}
      </div>

      <ProfileSection currentUser={currentUser} ></ProfileSection>

    </div>
  );
}
