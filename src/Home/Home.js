import Post from "../Post/Post";
import styles from "./Home.module.css"

export default function Home({ posts }) {
  return (
    <div className={styles.homePage}>

      {posts.map(({ id, post }) => (
        <Post
          key={id}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        ></Post>
      ))}
    </div>
  );
}
