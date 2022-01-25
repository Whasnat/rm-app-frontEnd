import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { UserSignupPage } from "./UserSignupPage";

beforeEach(cleanup);

describe("UserSignupPage", () => {
  describe("Layout", () => {
    it("has header of Sign Up", () => {
      const { container } = render(<UserSignupPage />);
      const header = container.querySelector("h1");
      expect(header).toHaveTextContent("Sign Up");
    });
    it("has input for display name", () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const displayNameInput = queryByPlaceholderText(
        "Enter your display name"
      );
      expect(displayNameInput).toBeInTheDocument();
    });
    it("has input for username", () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const usernameInput = queryByPlaceholderText("Enter your username");
      expect(usernameInput).toBeInTheDocument();
    });
    it("has input for password", () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordInput = queryByPlaceholderText("Enter your password");
      expect(passwordInput).toBeInTheDocument();
    });
    it("has input type for password", () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordInput = queryByPlaceholderText("Enter your password");
      expect(passwordInput.type).toBe("password");
    });
    it("has input for Retype password", () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const retypePassword = queryByPlaceholderText("Retype your password");
      expect(retypePassword).toBeInTheDocument();
    });
    it("has input type for Retype password", () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const retypePassword = queryByPlaceholderText("Retype your password");
      expect(retypePassword.type).toBe("password");
    });
  });
});
