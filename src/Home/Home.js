import Post from "../Post/Post";
import ProfileSection from "../ProfileSection/ProfileSection";

import styles from "./Home.module.css";

export default function Home({ posts, user }) {
  return (
    <div className={styles.home_page}>
      <div className={styles.home_posts}>
        {posts.map(({ id, post }) => (
          <Post
            key={id}
            postId = {id}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
            likedBy = {post.likedBy}
            time = {post.timestamp}
            userPhoto={post.userPhoto}
            uid={post.uid}
          ></Post>
        ))}
      </div>

      <ProfileSection user={user} ></ProfileSection>

    </div>
  );
}
