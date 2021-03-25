import ExplorePost from "../ExplorePost/ExplorePost";
import styles  from  "./Explore.module.scss"



export default function Explore({ posts }) {
    return (
        <>
            <div className={styles.exploreContainer}>
                {posts.map(({ id, post }) => (
                    <ExplorePost key={id} post={post} id={id}/>
                ))}
            </div>

        </>
    );
}