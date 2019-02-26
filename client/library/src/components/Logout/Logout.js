import React, { Component } from "react";
import { GoogleLogout } from "react-google-login";

class Logout extends Component {
  logout = e => {
    console.log(e);
    localStorage.clear();
    console.log("am i working ");
  };
  render() {
    return (
      <GoogleLogout
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
      />
    );
  }
}

export default Logout;
