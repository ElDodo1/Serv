import React, { useState, useEffect } from "react";
import { Paper, Button, TextField } from "@material-ui/core";
import { db, fire } from "../../Firebase/config";
import firebase from "firebase";
import "./PostPage.css";
import { Link, withRouter } from "react-router-dom";
import CommentCard from "../CommentCard/CommentCard";
import { useCallback } from "react";

const PostPage = (match) => {
  let [postDataFromDatabase, setPostData] = useState({});
  let url = match.location.pathname;
  let urlArr = url.split("/");
  let [state, setState] = useState(
    match ? [{ userId: urlArr[2] }, { postId: urlArr[3] }] : ""
  );
  let [comment, setComment] = useState("");
  let [rating, setRating] = useState("");
  let [cFD, setCommentsFromDatabase] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await db
        .collection("posts")
        .doc(state[0].userId)
        .get()
        .then(function (doc) {
          let posts = doc.data().posts;
          let selectedPostId = state[1].postId;
          for (let i = 0; i < posts.length; i++) {
            if (posts[i].postId == selectedPostId) {
              setPostData(posts[i]);
              break;
            }
          }
        });
    };
    fetchData();
  }, []);
  useEffect(() => {
    const displayComments = async () => {
      let commentComponents = [];
      await db
        .collection("postsComments")
        .doc(state[1].postId)
        .get()
        .then(function (doc) {
          let comments = doc.data().comments;
          comments.map((userComment, index) => {
            commentComponents.push(<CommentCard data={userComment} />);
          });
        });
      setCommentsFromDatabase(commentComponents);
    };
    displayComments();
  }, []);
  const handleCommentAndRating = (event) => {
    if (event.target.name === "comment") {
      setComment(event.target.value);
    } else {
      setRating(event.target.value);
    }
  };
  const saveComment = () => {
    let user = fire.auth().currentUser;
    let currentPostComment = {
      addedBy: user.displayName,
      commentRating: rating,
      commentText: comment,
    };
    let commentsRef = db.collection("postsComments").doc(state[1].postId);
    commentsRef.update({
      comments: firebase.firestore.FieldValue.arrayUnion(currentPostComment),
    });
    let currentcFD = cFD;
    currentcFD.push(<CommentCard data={currentPostComment} />);
    setCommentsFromDatabase(currentcFD);
    setRating("");
    setComment("");
  };

  return (
    <div id="page-container">
      <Paper elevation={4} id="post-container">
        <div id="post-title" className="post-item">
          {postDataFromDatabase.postTitle}
        </div>
        <div id="post-body" className="post-item">
          {postDataFromDatabase.postText}
        </div>
        <div id="post-price-button" className="post-item">
          <div id="post-price">
            {postDataFromDatabase.postPrice} <span>RON</span>
          </div>
          <div id="post-button">
            <Link
              id="link"
              to={{
                pathname: `/shop/${state[0].userId}/${state[1].postId}/checkout`,
                state: {
                  title: postDataFromDatabase.postTitle,
                  text: postDataFromDatabase.postText,
                  price: postDataFromDatabase.postTitle,
                },
              }}
            >
              <Button variant="contained" color="secondary">
                Buy now!
              </Button>
            </Link>
          </div>
        </div>
        <div
          id="comments-container"
          style={{ maxHeight: 800, overflow: "auto" }}
        >
          {cFD ? cFD : "No comments to display"}
        </div>
        <div id="new-comment">
          <TextField
            required
            id="standard-required"
            label="Enter a comment"
            name="comment"
            onChange={handleCommentAndRating}
            value={comment}
          />
          <TextField
            required
            id="standard-required"
            label="Enter a rating 1 to 5"
            name="rating"
            onChange={handleCommentAndRating}
            value={rating}
          />
          <Button color="primary" variant="contained" onClick={saveComment}>
            Add
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default withRouter(PostPage);
