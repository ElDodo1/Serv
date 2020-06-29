import React, { useEffect } from "react";
import { Paper, TextField, Button } from "@material-ui/core";
import "./Checkout.css";
import { Link } from "react-router-dom";
import { fire } from "../../Firebase/config";
import { useState } from "react";
const Checkout = (props) => {
  const [email, setEmail] = useState("");
  useEffect(() => {
    let user = fire.auth().currentUser;
    setEmail(user.email);
  }, []);
  return (
    <div id="checkout-content">
      <Paper id="checkout-container" elevation={15}>
        <div id="left-content">
          <h2>Customer information</h2>
          <TextField
            id="standard-multiline-flexible"
            label="Insert your email adress"
            variant="outlined"
            fullWidth={true}
            name="postTitle"
            className="title-input"
            value={email}
          />
          <h2>Phone</h2>
          <TextField
            id="standard-multiline-flexible"
            label="Insert your phone number"
            variant="outlined"
            fullWidth={true}
            className="title-input"
          />
          <Link to="/" id="finish">
            <Button
              size="larger"
              id="finishButton"
              color="secondary"
              variant="contained"
            >
              Finish
            </Button>
          </Link>
        </div>
        <div id="right-content">
          <Paper id="post-content" elevation={4}>
            <div id="title">{props.location.state.title}</div>
            <div id="text">{props.location.state.text}</div>
            <div id="price">{props.location.state.price} RON</div>
          </Paper>
        </div>
      </Paper>
    </div>
  );
};

export default Checkout;
