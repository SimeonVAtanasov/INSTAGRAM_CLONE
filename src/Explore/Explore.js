import ExplorePost from "../ExplorePost/ExplorePost";
import   "./Explore.css"


export default function Explore({ posts }) {
    return (
        <>
            <div id="exploreContainer">
                {posts.map(({ id, post }) => (
                    <ExplorePost key={id} {...post} />
                ))}
            </div>

        </>
    );
}