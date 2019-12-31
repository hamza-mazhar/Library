import React from "react";
import { Route, Switch } from "react-router-dom";
import Welcome from "./components/welcome";
import BookList from "./components/Books";
import CreateBook from "./components/Books/CreateBook";
import BookById from "./components/Books/BookDetail";
import Login from "./components/Login";
import RegisterForm from "./components/SignUp";
import Redux from "./components/Redux";
import Scheduler from "./components/Scheduler";
import Forgot from "./components/Login/forgetPass";
import NewPass from "./components/Login/newPass";
function isUserLoggedIn() {
  return localStorage.getItem("login") === "true" ? true : false;
}

class Router extends React.Component {
  render() {
    const userLoggedIn = isUserLoggedIn();
    //here ad list page set on the welcome
    if (!userLoggedIn) {
      return (
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={RegisterForm} />
          <Route exact path="/forgot" component={Forgot} />
          <Route exact path="/newPass/:token" component={NewPass} />
          <Route exact path="/schedler" component={Scheduler} />
        </Switch>
      );
    }
    if (userLoggedIn)
      return (
        <div>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/books" component={BookList} />
          <Route exact path="/newBook" component={CreateBook} />
          <Route exact path="/book/:id" component={BookById} />
          <Route exact path="/redux" component={Redux} />
        </div>
      );
  }
}
export default Router;
