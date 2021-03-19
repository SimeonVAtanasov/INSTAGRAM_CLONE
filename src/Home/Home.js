import Post from "../Post/Post";
export default function Home({ posts }) {
  return (
    <div>
      <h2>Home</h2>
      {posts.map(({id, post}) => (
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
