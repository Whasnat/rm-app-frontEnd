import React, { Component } from "react";

export class UserSignupPage extends Component {
  state = {
    displayName: "",
    username: "",
    password: "",
    passwordRepeat: "",
  };

  onChangeDisplayName = (event) => {
    const value = event.target.value;
    this.setState({ displayName: value });
  };

  onChangeUsername = (event) => {
    const value = event.target.value;
    this.setState({ username: value });
  };

  onChangePassword = (event) => {
    const value = event.target.value;
    this.setState({ password: value });
  };

  onChangePasswordRepeat = (event) => {
    const value = event.target.value;
    this.setState({ passwordRepeat: value });
  };

  onClickSignUp = () => {
    this.props.actions.postSignup();
  };

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <div>
          <input
            placeholder="Enter your display name"
            value={this.state.displayName}
            onChange={this.onChangeDisplayName}
          ></input>
        </div>
        <div>
          <input
            placeholder="Enter your username"
            value={this.state.username}
            onChange={this.onChangeUsername}
          ></input>
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter your password"
            value={this.state.password}
            onChange={this.onChangePassword}
          ></input>
        </div>
        <div>
          <input
            type="password"
            placeholder="Retype your password"
            value={this.state.passwordRepeat}
            onChange={this.onChangePasswordRepeat}
          ></input>
        </div>
        <div>
          <button onClick={this.onClickSignUp}>Sign Up</button>
        </div>
      </div>
    );
  }
}

UserSignupPage.defaultProps = {
  actions: {
    postSignup: () =>
      new Promise((resolve, rejected) => {
        resolve();
      }),
  },
};
export default UserSignupPage;
