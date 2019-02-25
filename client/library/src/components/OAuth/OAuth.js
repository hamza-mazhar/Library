import GoogleLogin from "react-google-login";

const Oauth = () => {
  return (
    <div>
      <GoogleLogin
        clientId="824186848644-r4ac0od39bsu0ni102kt905632q8ov13.apps.googleusercontent.com"
        render={renderProps => (
          <button onClick={renderProps.onClick}>
            This is my custom Google button
          </button>
        )}
        buttonText="Login"
        // onSuccess={responseGoogle}
        // onFailure={responseGoogle}
      />
    </div>
  );
};

export default Oauth;
