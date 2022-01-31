import React from "react";
import { render, cleanup, fireEvent, waitForDomChange } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { UserSignupPage } from "./UserSignupPage";

beforeEach(cleanup);

describe("UserSignupPage", () => {
  describe("Layout", () => {
    it("has header of Sign Up", () => {
      const { container } = render(<UserSignupPage />);
      const header = container.querySelector("h2");
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
    it("has submit button", () => {
      const { container } = render(<UserSignupPage />);
      const button = container.querySelector("button");
      expect(button).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    const changeEvent = (content) => {
      return {
        target: {
          value: content,
        },
      };
    };

    const mockAsyncDelayed = () => {
      return jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({});
          }, 300);
        });
      });
    };

    let button,
      displayNameInput,
      usernameInput,
      passwordInput,
      passwordRepeatInput;

    const setupForSubmit = (props) => {
      const rendered = render(<UserSignupPage {...props} />);

      const { container, queryByPlaceholderText } = rendered;

      displayNameInput = queryByPlaceholderText("Enter your display name");
      usernameInput = queryByPlaceholderText("Enter your username");
      passwordInput = queryByPlaceholderText("Enter your paassword");
      passwordRepeatInput = queryByPlaceholderText("Repeat your password");
      button = container.querySelector("button");

      return rendered;
    };

    it("has the displayName value into state", () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const displayNameInput = queryByPlaceholderText(
        "Enter your display name"
      );

      fireEvent.change(displayNameInput, changeEvent("my-display-name"));
      expect(displayNameInput).toHaveValue("my-display-name");
    });

    it("has the username value into state", () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const usernameInput = queryByPlaceholderText("Enter your username");

      fireEvent.change(usernameInput, changeEvent("my-username"));
      expect(usernameInput).toHaveValue("my-username");
    });

    //  password input
    it("has the password value into state", () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordInput = queryByPlaceholderText("Enter your username");

      fireEvent.change(passwordInput, changeEvent("Password123"));
      expect(passwordInput).toHaveValue("Password123");
    });

    it("has the repeat password value into state", () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordRepeatInput = queryByPlaceholderText("Enter your username");

      fireEvent.change(passwordRepeatInput, changeEvent("Password123"));
      expect(passwordRepeatInput).toHaveValue("Password123");
    });

    it("calls postSignup when fields are valid and actions are provided in props", () => {
      const actions = {
        postSignup: jest.fn().mockResolvedValueOnce({}),
      };

      setupForSubmit({ actions });
      fireEvent.click(button);

      expect(actions.postSignup).toHaveBeenCalledTimes(1);
    });

    it("does not throw exception when actions are not provided in props", () => {
      setupForSubmit();
      expect(() => fireEvent.click(button)).not.toThrow();
    });

    it("call post  user body when fields are valid", () => {
      const actions = {
        postSignup: jest.fn().mockResolvedValueOnce({}),
      };

      setupForSubmit({ actions });
      fireEvent.click(button);

      const expectedUserObject = {
        displayName: "",
        username: "",
        password: "",
        passwordRepeat: "",
      };
      expect(actions.postSignup).toHaveBeenCalledWith(expectedUserObject);
    });

    it("does not let the user to click sign up while request is being processed", () => {
      const actions = {
        postSignup: mockAsyncDelayed(),
      };

      setupForSubmit({ actions });
      fireEvent.click(button);

      fireEvent.click(button);
      expect(actions.postSignup).toHaveBeenCalledTimes(1);
    });

    it("displays spinner while signup request is being processed", () => {
      const actions = {
        postSignup: mockAsyncDelayed(),
      };

      const { queryByRole } = setupForSubmit({ actions });
      fireEvent.click(button);

      const spinner = queryByRole("status");
      expect(spinner).toBeInTheDocument();
    });

    it("hides spinner when api call is finished", async () => {
      const actions = {
        postSignup: mockAsyncDelayed(),
      };

      const { queryByRole } = setupForSubmit({ actions });
      fireEvent.click(button);

      await waitForDomChange();

      const spinner = queryByRole("status");
      expect(spinner).not.toBeInTheDocument();
    });
  });
});
