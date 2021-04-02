
import "./ProfileSection.css";
import Avatar from "@material-ui/core/Avatar";
import StoryUpload from "../StoryUpload";
import { Link } from "react-router-dom";

export default function ProfileSection({ currentUser }) {
  if (currentUser) {
    return (
      <div className="profile_section">
        <div className="profile_section_header">
          <div className="user_details">
            <Link to={`/profile/${currentUser.uid}`}>
              <Avatar
                className="profile_section_avatar"
                alt={currentUser.displayName}
                src={currentUser.photoUrl || "/static/images/avatar/1.jpg"}
              ></Avatar>

              <span> {currentUser.displayName}</span>
            </Link>
          </div>

          <StoryUpload
            user={currentUser}
            text={"Upload photo"}
            isPost={true}
            buttonText={"Upload post"}
          />
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
