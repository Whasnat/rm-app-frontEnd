import React, { Component } from "react";

export class UserSignupPage extends Component {
  state = {
    displayName: "",
    username: "",
    password: "",
    passwordRepeat: "",
    pendingApiCall: false,
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
    const user = {
      username: this.state.username,
      displayName: this.state.displayName,
      password: this.state.password,
      passwordRepeat: this.state.passwordRepeat,
    };

    this.setState({ pendingApiCall: true });
    this.props.actions.postSignup(user);
  };

  render() {
    return (
      <div className="container">
        <h1 className="text-center">RM Universe</h1>
        <h2 className="text-left">Sign Up</h2>
        <div className="col-12 mb-3">
          <label>Display Name</label>
          <input
            className="form-control"
            placeholder="Enter your display name"
            value={this.state.displayName}
            onChange={this.onChangeDisplayName}
          ></input>
        </div>
        <div className="col-12 mb-3">
          <label>Username</label>
          <input
            className="form-control"
            placeholder="Enter your username"
            value={this.state.username}
            onChange={this.onChangeUsername}
          ></input>
        </div>
        <div className="col-12 mb-3">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            placeholder="Enter your password"
            value={this.state.password}
            onChange={this.onChangePassword}
          ></input>
        </div>
        <div className="col-12 mb-3">
          <label>Confirm Password</label>

          <input
            className="form-control"
            type="password"
            placeholder="Retype your password"
            value={this.state.passwordRepeat}
            onChange={this.onChangePasswordRepeat}
          ></input>
        </div>
        <div className="col-12 mb-3">
          <button
            className="btn btn-primary"
            onClick={this.onClickSignUp}
            disabled={this.state.pendingApiCall}
          >
            {this.state.pendingApiCall && (
              <div
                className="spinner-border text-light spinner-border-sm mr-1"
                role="status"
              >
                <span className="sr-only"></span>
              </div>
            )}
            Sign Up
          </button>
        </div>
      </div>
    );
  }
}

UserSignupPage.defaultProps = {
  actions: {
    postSignup: () =>
      new Promise((resolve, reject) => {
        resolve({});
      }),
  },
};
export default UserSignupPage;
