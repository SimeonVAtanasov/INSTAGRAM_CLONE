import ImgExplore from "../ImgExplore/ImgExplore";
import  styles  from  "./ExplorePost.module.css"
export default function ExplorePost({imageUrl, caption}) {
     


    return (
        <>
        <div  className={styles.postLayout}>
            {/* <a> */}
            <div className={styles.imagebox}>
                <ImgExplore src={imageUrl} alt={caption}/>
            </div>
            <div className={styles.aditives}>
                <span>Heart</span>
                <span>coments</span>
            </div>
            {/* <a/> */}
        </div>
    </>
    );
  }