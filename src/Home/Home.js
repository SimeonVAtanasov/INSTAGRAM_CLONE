import Post from "../Post/Post";
import ProfileSection from "../ProfileSection/ProfileSection";

import styles from "./Home.module.css";

export default function Home({ posts }) {
  return (
    <div className={styles.home_page}>
      <div className={styles.home_posts}>
        {posts.map(({ id, post }) => (
          <Post
            key={id}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          ></Post>
        ))}
      </div>
      <ProfileSection></ProfileSection>

    </div>
  );
}
