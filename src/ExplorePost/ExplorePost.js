import ImgExplore from "../ImgExplore/ImgExplore";
import styles from "./ExplorePost.module.css";
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
export default function ExplorePost({ imageUrl, caption, comments, likes }) {



    return (
        <>
            <div className={styles.postLayout}>
                {/* <a> */}
                <div className={styles.imagebox}>
                    <ImgExplore src={imageUrl} alt={caption} />
                </div>
                <div className={styles.aditives}>
                    <p><FavoriteBorderOutlinedIcon />{(likes) ? likes : <></>}</p>
                    <p><ChatBubbleOutlineOutlinedIcon />{(comments) ? comments.length : <></>}</p>
                </div>
                {/* <a/> */}
            </div>
        </>
    );
}