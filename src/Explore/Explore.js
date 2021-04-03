import ExplorePost from "./ExplorePost/ExplorePost.js";
import styles from "./Explore.module.scss";
import {useSelector} from "react-redux";


export default function Explore() {
  const posts = useSelector(state => state.posts.posts);
  return (
    <>
      <div className={styles.exploreContainer}>
        {posts.map(({ id, post }) => (
          <ExplorePost key={id} post={post} id={id} uid ={post.createdBy}/>
        ))}

        
      </div>
    </>
  );
}
