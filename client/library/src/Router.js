import React from "react";
import { Route, Switch } from "react-router-dom";
import Welcome from "./components/welcome";
import BookList from "./components/Books";
import CreateBook from "./components/Books/CreateBook";
import Login from "./components/Login";
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
          <Route exact path="/books" component={BookList} />
          <Route exact path="/newBook" component={CreateBook} />
          <Route exact path="/login" component={Login} />
        </Switch>
      );
    }
    if (userLoggedIn)
      return (
        <div>
          <Route exact path="/" component={Welcome} />
        </div>
      );
  }
}
export default Router;
