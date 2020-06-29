import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PostItem from "../PostItem/PostItem";
import { db } from "../../Firebase/config";
import "./Shop.css";
const Shop = () => {
  let [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let posts = [];
      console.log("ma execut coae");
      await db
        .collection("posts")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            let id = doc.id;
            let data = doc.data().posts;
            let post = [id, ...data];
            posts.push(post);
          });
        });

      setPosts(posts);
    };
    fetchData();
  }, []);

  const renderPosts = () => {
    const postComponents = [];
    posts.map((userPosts, index) => {
      for (let i = 1; i < userPosts.length; i++) {
        let id = userPosts[0];
        postComponents.push(
          <PostItem
            key={`p-${(index + 1) * Math.floor(Math.random() * 10 + 1)}`}
            id={id}
            post={userPosts[i]}
          />
        );
      }
    });
    return postComponents;
  };
  setTimeout("");
  return (
    <>
      <div
        id="container-post-items"
        style={{ maxHeight: 800, overflow: "auto" }}
      >
        {renderPosts()}
      </div>
    </>
  );
};

export default withRouter(Shop);
