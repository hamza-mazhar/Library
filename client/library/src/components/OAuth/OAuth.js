import React, { Component } from "react";
import GoogleLogin from "react-google-login";

class Oauth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false
    };
  }
  componentDidMount() {
    localStorage.clear();
  }
  responseGoogle = res => {
    console.log(res);
    res.error
      ? localStorage.setItem("login", "false")
      : localStorage.setItem("login", "true");
  };

  render() {
    return (
      <div>
        <GoogleLogin
          clientId="824186848644-r4ac0od39bsu0ni102kt905632q8ov13.apps.googleusercontent.com"
          render={renderProps => (
            <button
              onClick={renderProps.onClick}
              style={{
                background: "transparent",
                border: "none"
              }}
            >
              Login
            </button>
          )}
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
        />
      </div>
    );
  }
}

export default Oauth;
