import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { fire } from "../../Firebase/config";
import { Button, Input, Paper } from "@material-ui/core";
import { AuthContext } from "../../Auth";
import "./Login.css";
const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await fire
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const signUpHandler = () => {
    history.push("/register");
  };

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Paper id="login-container" elevation={5}>
      <h1 className="login-title">Login</h1>

      <form onSubmit={handleLogin} id="login-content">
        <Input
          name="email"
          type="email"
          id="email"
          className="input"
          placeholder="The email goes here"
          size="large"
        />
        <Input
          name="password"
          type="password"
          id="password"
          className="input"
          placeholder="The password goes here"
        />
        <Button type="submit" variant="contained" color="secondary" id="button">
          Log In
        </Button>
        <div id="register-message">Don't have an account yet ?</div>

        <Button
          id="button"
          variant="contained"
          color="primary"
          onClick={signUpHandler}
          className="register-button"
        >
          Sign Up
        </Button>
      </form>
    </Paper>
  );
};

export default withRouter(Login);
