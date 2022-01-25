import React, { Component } from "react";

export class UserSignupPage extends Component {
  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <div>
          <input placeholder="Enter your display name"></input>
        </div>
        <div>
          <input placeholder="Enter your username"></input>
        </div>
        <div>
          <input type="password" placeholder="Enter your password"></input>
        </div>
        <div>
          <input type="password" placeholder="Retype your password"></input>
        </div>
      </div>
    );
  }
}

export default UserSignupPage;
