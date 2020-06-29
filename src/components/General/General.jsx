import React, { Component } from "react";
import {
  Container,
  Box,
  TextField,
  Grid,
  FormControl,
  Button,
  Divider,
} from "@material-ui/core";
import fire, { db } from "../../Firebase/config";
import "./General.css";
import { AccountCircle } from "@material-ui/icons";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
class General extends Component {
  state = {
    displayName: "",
    email: "",
  };
  componentDidMount() {
    let user = fire.auth().currentUser;
    this.setState({
      displayName: "test",
      email: "test",
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  updateUsername = () => {
    let user = fire.auth().currentUser;

    user
      .updateProfile({
        displayName: this.state.displayName,
      })
      .then((succ) => {
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    let styles = {
      textField: {
        width: 300,
        margin: 100,
      },
    };
    return (
      <Container maxWidth="sm" id="general-container">
        <Box className="container">
          <FormControl>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <AccountCircle />
              </Grid>
              <Grid item>
                <TextField
                  id="input-with-icon-grid"
                  label="Display name"
                  //   inputProps={{ style: { width: } }}
                  width="auto"
                  name="displayName"
                  value={this.state.displayName}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.updateUsername}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </FormControl>
          <Divider id="input-divider" />
        </Box>
        <Box className="container">
          <FormControl>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <MailOutlineIcon />
              </Grid>
              <Grid item>
                <TextField
                  id="input-with-icon-grid"
                  label="Email"
                  value={this.state.email}
                  name="email"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.updateEmail}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </FormControl>
          <Divider id="input-divider" />
        </Box>
      </Container>
    );
  }
}

export default General;
