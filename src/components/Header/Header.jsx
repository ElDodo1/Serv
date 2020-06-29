import React, { useEffect, useState } from "react";
import "./Header.css";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { fire } from "../../Firebase/config";
import { Redirect, Link, withRouter } from "react-router-dom";

const Header = ({ history }) => {
  const signOut = () => {
    fire.auth().signOut();
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    margin: {
      marginRight: 12,
      marginLeft: 12,
    },
    size: "medium",
  }));
  const classes = useStyles();
  const theme = useTheme();
  console.log(theme);
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h4" className={classes.title}>
          <Link to="/" className="linkRouting">
            Serv
          </Link>
        </Typography>

        <Link to="/shop" className="linkRouting">
          <Button color="primary" className={`${classes.margin} my-button`}>
            SHOP
          </Button>
        </Link>
        <Link to="/addapost" className="linkRouting">
          <Button color="primary" className={`${classes.margin} my-button`}>
            ADD A POST
          </Button>
        </Link>
        <Link to="/profile" className="linkRouting">
          <Button color="primary" className={`${classes.margin} my-button`}>
            PROFILE
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Header);
