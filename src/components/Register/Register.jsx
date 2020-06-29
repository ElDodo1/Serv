import React, { useCallback } from "react";
import { withRouter } from "react-router-dom";
import "./Register.css";
import { TextField, Paper, Button } from "@material-ui/core";
import { fire, db } from "../../Firebase/config";
const Register = ({ history }) => {
  const handleRegister = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password, username } = event.target.elements;
      try {
        await fire
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
      const user = fire.auth().currentUser;
      let userId = user.uid;
      try {
        await db.collection("users").doc(userId).set({
          username: username.value,
          email: email.value,
          posts: [],
        });
      } catch (error) {
        alert(error);
      }
      try {
        await db.collection("posts").doc(userId).set({
          posts: [],
        });
      } catch (error) {
        alert(error);
      }
      try {
        await user.updateProfile({
          displayName: username.value,
        });
      } catch (error) {
        console.log(error);
      }
      try {
        await db.collection("shortPathPosts");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );
  const routeToLogin = () => {
    history.push("/login");
  };
  return (
    <Paper id="register-container" elevation={5}>
      <h1 className="register-title">Register</h1>
      <form onSubmit={handleRegister} id="register-content">
        <div id="form-label-username">Username</div>
        <TextField
          id="username"
          name="username"
          required
          label="Required"
          placeholder="Insert your username"
          // onChange={this.handleChange}
          margin="normal"
          type="username"
          className="form-label"
        />
        <div id="form-label-email">Email</div>
        <TextField
          id="email"
          name="email"
          required
          label="Required"
          placeholder="Insert your email"
          margin="normal"
          type="username"
          className="form-label"
        />
        <div id="form-label-password"> Password</div>
        <TextField
          id="password"
          name="password"
          required
          label="Required"
          placeholder="Insert your password"
          margin="normal"
          type="password"
          className="form-label"
        />
        <Button
          type="submit"
          value="Submit"
          color="secondary"
          variant="contained"
          id="button"
        >
          Sign Up
        </Button>
        <div id="login-text"> Already have an account ? </div>
        <Button
          color="primary"
          variant="contained"
          id="button"
          onClick={routeToLogin}
        >
          Login
        </Button>
      </form>
    </Paper>
  );
};

export default withRouter(Register);
