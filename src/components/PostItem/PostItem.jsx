import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Paper, Button } from "@material-ui/core";
const PostItem = (props) => {
  const { id } = props;
  const { postText, postTitle, postPrice } = props.post;
  console.log(props);
  return (
    <Paper elevation={18} id="post-container">
      <h1 id="postTitle">{postTitle}</h1>
      <div id="postText">{postText}</div>
      <div id="price-button-container">
        <div id="postPrice">
          {postPrice} <span>RON</span>
        </div>

        <Link id="link" to={`/shop/${props.id}/${props.post.postId}`}>
          <Button color="primary" variant="contained">
            Find out more!
          </Button>
        </Link>
      </div>
    </Paper>
  );
};

export default withRouter(PostItem);
