import React, { Component } from "react";

const CommentCard = (props) => {
  return (
    <div className="comment-container">
      <div id="comment-creator-rating">
        <div id="creator">{props.data.addedBy}</div>
        <div id="rating">
          {props.data.commentRating}{" "}
          <span style={{ fontWeight: "bold" }}>/5</span>
        </div>
      </div>
      <div id="creator-text">{props.data.commentText}</div>
    </div>
  );
};

export default CommentCard;
