import { updateUser, signup } from "../services/commonServices";
import React from "react";
import ReactTooltip from "react-tooltip";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstPage: true,
      headerText: "ENTER YOUR EMAIL",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      isSubmitted: false,
      emailError: false,
      passwordError: false,
      isEditUser: false,
      userId: "",
      showPassword: false,
      inputType: "password",
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    const editUser = sessionStorage.getItem("editUser");
    if (editUser) {
      this.setState({ isFirstPage: false, isEditUser: true });
      const user = JSON.parse(sessionStorage.getItem("userData"));
      if (user) {
        this.setUser(user);
      }
    }
  }

  setUser(user) {
    this.setState({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userId: user.id,
      password: user.password,
    });
  }

  signupUser = async () => {
    await signup({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      email: this.state.email,
    });
    this.props.history.push("/dashboard");
  };

  handleInput = async (label, value) => {
    this.setState({ emailError: false });
    if (label === "email") {
      await this.setState({ email: value });
    } else if (label === "firstName") {
      await this.setState({ firstName: value });
    } else if (label === "lastName") {
      await this.setState({ lastName: value });
    } else if (label === "password") {
      await this.setState({ password: value });
    }
  };

  submitbutton() {
    const EMAIL_PATTERN =
      /^(([^<>()/[\]\\.,;:\s@"]+(\.[^<>()/[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!this.state.isEditUser) {
      if (this.state.email && this.state.isFirstPage) {
        if (EMAIL_PATTERN.test(this.state.email)) {
          this.setState({ isFirstPage: false });
          this.setState({ headerText: "LET'S CREATE YOUR ACCOUNT" });
          this.props.history.push("/enter-basic-info");
        } else {
          this.setState({ emailError: true });
        }
      } else if (this.isValid()) {
        this.signupUser();
      }
    } else {
      if (this.isValid()) {
        this.editUserData();
      }
    }
  }

  isValid() {
    const EMAIL_PATTERN =
      /^(([^<>()/[\]\\.,;:\s@"]+(\.[^<>()/[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!PASSWORD_REGEX.test(this.state.password)) {
      this.setState({ passwordError: true });
      return;
    }
    if (
      EMAIL_PATTERN.test(this.state.email) &&
      this.state.firstName &&
      this.state.lastName &&
      PASSWORD_REGEX.test(this.state.password)
    ) {
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    this.removeData();
  }

  removeData() {
    sessionStorage.removeItem("editUser");
    sessionStorage.removeItem("userData");
  }

  editUserData = async () => {
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };
    await updateUser(this.state.userId, user);
    this.props.history.push("/dashboard");
  };

  togglePassword = () => [
    this.setState({
      showPassword: !this.state.showPassword,
      inputType: this.state.showPassword ? "password" : "text",
    }),
  ];

  render() {
    return (
      <div className="member-container">
        <div class="member-left">
          <div class="card flex flex-column">
            <h1 class="flex flex-start">{this.state.headerText}</h1>
            {/* Email */}
            <label class="flex flex-start mt-4" for="email">
              Email
            </label>
            <div class=" flex flex-start input-container">
              <input
                class="input  w-100"
                id="email"
                value={this.state.email}
                onChange={(e) => this.handleInput("email", e.target.value)}
              />
            </div>
            {this.state.emailError && (
              <div class=" flex flex-start error-text">
                Please enter a valid email
              </div>
            )}

            {/* firstname and lastname */}
            {!this.state.isFirstPage && (
              <div>
                <div class="flex flex-row w-100">
                  <div class="mr-15  w-100">
                    <label class="flex flex-start" for="firstName">
                      First name
                    </label>
                    <input
                      class="input input-container w-100"
                      value={this.state.firstName}
                      onChange={(e) =>
                        this.handleInput("firstName", e.target.value)
                      }
                      id="firstName"
                    />
                  </div>
                  <div class="ml-15 mr-15 w-100">
                    <label class="flex flex-start" for="lastName">
                      Last name
                    </label>
                    <input
                      class="input input-container  w-100"
                      value={this.state.lastName}
                      onChange={(e) =>
                        this.handleInput("lastName", e.target.value)
                      }
                      id="lastName"
                    />
                  </div>
                </div>
                {/* password */}
                <div>
                  <div class="flex flex-row">
                    <label class="flex flex-start" for="password">
                      Password
                    </label>
                    <span data-tip="Enter atleast 8 characters, minimum 1 number and minimum 1 letter" ref={(ref) => (this.fooRef = ref)}>
                      <i
                        onClick={() => {
                          ReactTooltip.hide(this.fooRef);
                        }}
                        class="fa fa-question-circle ml-15 cursor-pointer"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <ReactTooltip />
                  </div>
                  <div class=" flex flex-start input-container">
                    <input
                      class="input  w-100"
                      id="password"
                      value={this.state.password}
                      onChange={(e) =>
                        this.handleInput("password", e.target.value)
                      }
                      type={this.state.inputType}
                    />
                    <span class="w-0">
                      {this.state.showPassword ? (
                        <i
                          class="fa fa-eye eye"
                          aria-hidden="true"
                          onClick={() => this.togglePassword()}
                        ></i>
                      ) : (
                        <i
                          class="fa fa-eye-slash eye"
                          aria-hidden="true"
                          onClick={() => this.togglePassword()}
                        ></i>
                      )}
                    </span>
                  </div>
                  {this.state.passwordError && (
                    <div class=" flex flex-start error-text">
                      Please enter a valid password
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* button */}
            <div>
              <button className="button" onClick={() => this.submitbutton()}>
                NEXT
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
