import React, { useState, useContext, useEffect } from "react";
import { Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { db, fire } from "../../Firebase/config";
import Typewriter from "typewriter-effect";
import "./Home.css";
import { withRouter, Link } from "react-router-dom";
const Home = ({ history }) => {
  const [posts, setPosts] = useState([]);

  // componentDidMount() {
  //   db.collection("users")
  //     .get()
  //     .then((snapshot) => {
  //       let posts = [];
  //       snapshot.forEach((doc) => {
  //         doc.data().posts.forEach((post) => {
  //           posts.push(post);
  //         });
  //       });
  //       this.setState({ posts }, () => console.log(this.state.posts));
  //     });
  // }

  // displayPosts = () => {
  //   let { posts } = this.state;
  //   console.log(posts);
  //   return posts.map((post, index) => {
  //     return (
  //       <Grid item xs={3}>
  //         <PostItem data={post} key={`p-${index}`} />
  //       </Grid>
  //     );
  //   });
  // }
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
  }));
  const classes = useStyles();
  let home = document.getElementById("home-container");
  new Typewriter("#typewriter", {
    cursorClassName: "cursor-class",
    wrapperClassName: "my-class",
  });
  return (
    <>
      {/* <Container> */}
      {/* <Grid container wrap="nowrap" spacing={1} id="feed-container"> */}
      {/* <Grid container wrap="wrap" item xs={12} spacing={3}> */}
      {/* {this.displayPosts()} */}
      {/* </Grid> */}
      {/* </Grid> */}
      {/* </Container> */}
      <div id="home-container">
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString("Welcome to Service!")
              .pauseFor(500)
              .deleteChars(4)
              .pauseFor(500)
              .typeString("<strong>!</strong>")
              .pauseFor(2000)
              .start();
          }}
          options={{
            cursorClassName: "cursor-class",
            wrapperClassName: "type-writter",
          }}
        />
        <div className={`${classes.root} paper-container`}>
          <Paper elevation={3} className="paper-containers">
            <div className="paperTitle">Find a service!</div>
            <div className="paperBody">
              <span className="card-home-text">
                You're in need of a service but you don't know who to ask ?
              </span>
              <br /> <br />
              <span className="card-home-text">
                We got you covered!
              </span> <br /> <br />
              <span className="card-home-text">
                Start exploring all the services offered in our app!
              </span>
            </div>
            <div className="paperButton">
              <Link to="/shop" className="linkRouting">
                <Button color="primary" variant="contained">
                  Explore services
                </Button>
              </Link>
            </div>
          </Paper>
          <Paper elevation={3} className="paper-containers">
            <div className="paperTitle">Sell your service</div>
            <div className="paperBody">
              You're talented in doing a specific job but can't find a client?{" "}
              <br /> <br />
              We've got you covered too! <br /> <br />
              Start by adding a new post so that clients can reach out to you!
            </div>
            <div className="paperButton">
              <Link to="/addapost" className="linkRouting">
                <Button color="primary" variant="contained">
                  Add a Post
                </Button>
              </Link>
            </div>
          </Paper>
        </div>
      </div>
    </>
  );
};

export default withRouter(Home);
