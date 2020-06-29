import { TextField, Button, Paper } from "@material-ui/core";
import React, { useCallback } from "react";
import SaveIcon from "@material-ui/icons/Save";
import { fire, db } from "../../Firebase/config";
import { withRouter } from "react-router-dom";
import firebase from "firebase";
import "./AddAPost.css";
const AddAPost = () => {
  const savePostToDatabase = useCallback(async (event) => {
    event.preventDefault();
    const { postTitle, postText, postPrice } = event.target.elements;
    const user = fire.auth().currentUser;
    let username = user.displayName;
    let userId = user.uid;
    let id = new Date().getTime();
    let userPost = {
      postTitle: postTitle.value,
      postText: postText.value,
      postPrice: postPrice.value,
      postId: id,
    };
    let post = {
      ...userPost,
      createdBy: username,
    };
    let userPostsRef = db.collection("users").doc(userId);
    let postsRef = db.collection("posts").doc(userId);
    let postsCommentsRef = db.collection("postsComments").doc(String(id));
    try {
      await userPostsRef.update({
        posts: firebase.firestore.FieldValue.arrayUnion(userPost),
      });
    } catch (error) {
      console.log(error);
    }
    try {
      await postsRef.update({
        posts: firebase.firestore.FieldValue.arrayUnion(post),
      });
    } catch (error) {
      console.log(error);
    }
    try {
      await postsCommentsRef.set({
        comments: [],
      });
    } catch (error) {
      console.log(error);
    }
    alert("Post added succesfully!");
  }, []);
  return (
    <Paper id="add-a-post-container" elevation={5}>
      <form onSubmit={savePostToDatabase} id="add-a-post-content">
        <h1 className="add-a-post-title">Add a Post</h1>
        <TextField
          id="standard-multiline-flexible"
          label="Insert the title"
          rowsMax={4}
          variant="outlined"
          fullWidth={true}
          name="postTitle"
          className="title-input"
        />
        <TextField
          id="standard-multiline-flexible"
          label="Insert the post text here"
          multiline
          rowsMax={10}
          rows={5}
          variant="outlined"
          fullWidth={true}
          name="postText"
          className="text-input"
        />

        <TextField
          id="standard-multiline-flexible"
          label="Insert the price(RON)"
          variant="outlined"
          name="postPrice"
          className="price-input"
        />
        <Button
          id="save-post"
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<SaveIcon />}
          type="submit"
        >
          Save
        </Button>
      </form>
    </Paper>
  );
};

export default withRouter(AddAPost);
