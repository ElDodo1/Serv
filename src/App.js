import React, { Component } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import fire from "./Firebase/config";
import Home from "./components/Home/Home";
import Shop from "./components/Shop/Shop";
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import AddAPost from "./components/AddAPost/AddAPost";
import PostPage from "./components/PostPage/PostPage";
import Register from "./components/Register/Register";
import Checkout from "./components/Checkout/Checkout";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import { BrowserRouter as Router, Route } from "react-router-dom";
const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Header />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/shop" component={Shop} />
          <PrivateRoute exact path="/shop/:id/:id" component={PostPage} />
          <PrivateRoute exact path="/addapost" component={AddAPost} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute
            exact
            path="/shop/:id/:id/checkout"
            component={Checkout}
          />
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
