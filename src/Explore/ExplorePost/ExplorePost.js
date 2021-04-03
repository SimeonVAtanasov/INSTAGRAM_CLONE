import ImgExplore from "../../ImgExplore/ImgExplore";
import styles from "./ExplorePost.module.css";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import PostModal from "../../Post/PostModal";

export default function ExplorePost({ post, id, uid }) {
  const [commentsCount, setCommentsCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    db.collection("comments")
      .where("forPost", "==", id)
      .get()
      .then((snap) => {
        setCommentsCount(snap.size);
      });
  }, [id]);

  return (
    <>
      <div className={styles.postLayout}>
        {/* <a> */}
        <div className={styles.imagebox}>
          <ImgExplore
            src={post.imageUrl}
            alt={post.caption}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        </div>
        <div className={styles.aditives}>
          <p>
            <FavoriteBorderOutlinedIcon />
            {post.likedBy.length}
          </p>
          <p>
            <ChatBubbleOutlineOutlinedIcon />
            {commentsCount}
          </p>
        </div>
        {/* <a/> */}

        <PostModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          imageUrl={post.imageUrl}
          username={post.username}
          userPhoto={post.userPhoto}
          caption={post.caption}
          time={post.timestamp}
          postId={id}
          uid={uid}
        />
      </div>
    </>
  );
}
