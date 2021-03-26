import ImgExplore from "../ImgExplore/ImgExplore";
import styles from "./ExplorePost.module.css";
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { useEffect, useState } from "react";
import { db } from "../firebase";
export default function ExplorePost({post,  id}) {

    const [commentsCount, setCommentsCount] = useState(0);
    useEffect(()=>{
        db.collection("posts").doc(id).collection("comments").get()
        .then((snap) => {
            setCommentsCount(snap.size)
        });
    },[])

    
    return (
        <>
            <div className={styles.postLayout}>
                {/* <a> */}
                <div className={styles.imagebox}>
                    <ImgExplore src={post.imageUrl} alt={post.caption} />
                </div>
                <div className={styles.aditives}>
                    <p><FavoriteBorderOutlinedIcon />{post.likes}</p>
                    <p><ChatBubbleOutlineOutlinedIcon />{commentsCount}</p>
                </div>
                {/* <a/> */}
            </div>
        </>
    );
}