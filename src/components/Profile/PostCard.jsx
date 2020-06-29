import React, { useEffect } from "react";
import { Paper } from "@material-ui/core";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
import { Redirect, withRouter } from "react-router-dom";
import { db, fire } from "../../Firebase/config";
import { useState } from "react";
const PostCard = (props) => {
  const [display, setDisplay] = useState(false);
  const [userId, setUserId] = useState("");
  const redirectToPostPage = () => {
    props.history.push(`/shop/${userId}/${props.postId}`);
  };

  useEffect(() => {
    let userId = fire.auth().currentUser.uid;
    setUserId(userId);
  });
  const deleteItem = async () => {
    setDisplay(true);

    let postId = "";
    await db
      .collection("users")
      .doc(userId.toString())
      .get()
      .then((doc) => {
        let posts = doc.data().posts;
        posts.forEach((post, index) => {
          if (post.postId === props.postId) {
            posts.splice(index, 1);
            return;
          }
        });
        db.collection("users").doc(userId.toString()).update({
          posts: posts,
        });
      });

    await db
      .collection("posts")
      .doc(userId.toString())
      .get()
      .then((doc) => {
        let posts = doc.data().posts;
        posts.forEach((post, index) => {
          if (post.postId === props.postId) {
            posts.splice(index, 1);
            return;
          }
        });
        db.collection("posts").doc(userId.toString()).update({
          posts: posts,
        });
      });
    await db
      .collection("postsComments")
      .doc(props.postId.toString())
      .delete()
      .then(() => {
        console.log("DELETE SUCCESFULLY");
      });

    setDisplay(false);
  };
  return (
    <Paper
      className="user-post"
      elevation={5}
      style={{ display: `${display ? "none" : "static"}` }}
    >
      <div className="post-title">{props.data}</div>
      <div className="container-buttons">
        <div id="view-post">
          <VisibilityRoundedIcon onClick={redirectToPostPage} />
        </div>
        <div id="delete-post">
          <DeleteForeverRoundedIcon onClick={deleteItem} />
        </div>
      </div>
    </Paper>
  );
};

export default withRouter(PostCard);
