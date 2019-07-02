import React, { Component } from "react";
import { GoogleLogout } from "react-google-login";
import { Button } from "antd";
import { Redirect } from "react-router-dom";
class Logout extends Component {
  logout = e => {
    //console.log(e);
    localStorage.clear();
    //console.log("am i working ");
    window.location.replace("/");
  };
  render() {
    return (
      <div>
        <Button
          onClick={this.logout}
          style={{
            background: "transparent",
            border: "none",
            color: "inherit"
          }}
        >
          Logout
        </Button>
        {/* <GoogleLogout
          render={renderProps => (
            <button
              onClick={renderProps.onClick}
              style={{
                background: "transparent",
                border: "none"
              }}
            >
              Logout
            </button>
          )}
          onLogoutSuccess={this.logout}
        /> */}
      </div>
    );
  }
}

export default Logout;
