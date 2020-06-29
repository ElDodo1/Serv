import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import { Paper, TextField, Button, Container } from "@material-ui/core";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
import React, { useState, useEffect } from "react";
import { fire, db } from "../../Firebase/config";
import { withRouter } from "react-router-dom";
import PostCard from "./PostCard";
import "./Profile.css";
const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userPosts, setPosts] = useState([]);

  useEffect(() => {
    let user = fire.auth().currentUser;
    setUsername(user.displayName);
    setEmail(user.email);
  }, []);
  useEffect(() => {
    const userPostsFromDb = [];
    async function getData() {
      let user = fire.auth().currentUser;
      await db
        .collection("users")
        .doc(user.uid.toString())
        .get()
        .then((doc) => {
          let posts = doc.data().posts;
          posts.forEach((post) => {
            userPostsFromDb.push(
              <PostCard
                data={post.postTitle}
                key={`p-${Math.floor(Math.random) + 2}`}
                postId={post.postId}
              />
            );
          });
        });
      setPosts(userPostsFromDb);
    }
    getData();
  }, []);

  const signOut = () => {
    fire.auth().signOut();
  };
  const updateProfile = (event) => {
    let user = fire.auth().currentUser;
    event.preventDefault();
    console.log(event.target.elements);
    let { email, username } = event.target.elements;
    user.updateProfile({
      displayName: username.value,
      email: email.value,
    });
  };

  const handleChange = (event) => {
    event.preventDefault();
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else {
      setUsername(event.target.value);
    }
  };

  return (
    <>
      <div id="profile">
        <form onSubmit={updateProfile}>
          <Paper elevation={5} id="profile-container">
            <div id="photoIcon-container">
              <AccountCircleRoundedIcon />
            </div>
            <div id="inputs-container">
              <div id="username-container">
                <TextField
                  id="input-with-icon-grid"
                  label="Username"
                  width="auto"
                  name="username"
                  value={username}
                  onChange={handleChange}
                />
                <Button type="submit" color="primary" variant="contained">
                  Save
                </Button>
              </div>
              <div id="email-container">
                <TextField
                  id="input-with-icon-grid"
                  label="Email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
                <Button type="submit" color="primary" variant="contained">
                  Save
                </Button>
              </div>
            </div>

            <div id="sign-out-container">
              <Button onClick={signOut} color="secondary" variant="contained">
                Sign Out
              </Button>
            </div>
          </Paper>
        </form>
      </div>
      <Container id="container-user-posts">
        <Paper
          id="profile-posts-content"
          elevation={20}
          style={{ maxHeight: 300, overflow: "auto" }}
        >
          <h1>My posts</h1>
          {userPosts ? userPosts : "no data to display"}
        </Paper>
      </Container>
    </>
  );
};

export default withRouter(Profile);
