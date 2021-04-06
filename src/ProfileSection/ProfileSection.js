
import "./ProfileSection.css";
import Avatar from "@material-ui/core/Avatar";
import StoryUpload from "../PhotoUpload";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import Comment from "../Post/Comment/Comment";
import { Button } from "@material-ui/core";
import {useSelector} from "react-redux";
import { db } from "../AppService/firebase";

export default React.memo(function ProfileSection() {

  const [users, setUsers] = useState([]);
  const currentUser = useSelector(state => state.currentUser.user)

  useEffect(() => {
    db.collection("users")
      .limit(5)
      .get()
      .then(res => {
        let arr = [];
        res.forEach(user => arr.push(user.data()))
        setUsers(arr)
      })

  }, [])


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
             />

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

          <p className="explore_users">Explore users</p>
        <section className="users_section">
          {users.map(({ displayName, photoUrl, uid }) => <div key={v4()} >
            <Comment
              username={displayName}
              userPhoto={photoUrl}
              uid={uid} />

            <Button href={`/profile/${uid}`} >
              Visit
            </Button>
          </div>)}
        </section>

        <footer className="profile_section_footer">
          {/* <aside>About:</aside> */}
          <p>This site is created by
          &nbsp;
            <a className="profile_section_footer_link" href="https://github.com/NevenaKirova">
              Nevena Kirova
            </a>
            &nbsp;

            and
            &nbsp;
            <a className="profile_section_footer_link" href="https://github.com/SimeonVAtanasov">
              Simeon Atanasov
            </a>
          </p>
          <p>
            This is a project for IT Tallents's Training camp
            </p>
        </footer>
      </div>
    );
  } else {
    return <></>;
  }
})
