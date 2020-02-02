import React, { Component } from "react";
import "./register.css";
import { NavLink } from "react-router-dom";
import { User } from "../../models/user";
import { apiRequest } from "../../utils/Helper";
import io from "socket.io-client";
let socket: any;

interface RegisterState {
    isAvailable: string;
    firstName: string;
    lastName: string;
    userName: string;
    userPass: string;
    errors: {
        firstNameErr: string;
        lastNameErr: string;
        userNameErr: string;
        userPassErr: string;
    };
}

export class Register extends Component<any, RegisterState> {

    constructor(props: any) {
        super(props);
        this.state = {
            isAvailable: "",
            firstName: "",
            lastName: "",
            userName: "",
            userPass: "",
            errors: {
                firstNameErr: "",
                lastNameErr: "",
                userNameErr: "",
                userPassErr: ""
            }
        };
    }

    public handleClear = (e: any): void => {
        this.setState({
            firstName: "",
            lastName: "",
            userName: "",
            userPass: ""
        });
    }

    public handleChange = (e: any): void => {
        this.setState({
            [e.target.id]: e.target.value
        } as any);

        if (e.target.id === "userName") {
            if (e.target.value.length <= 3) {
                this.setState({ isAvailable: "" });
                return;
            }
            socket.emit("user-availability-check", e.target.value);
            socket.on("user-availability-check", (isAvailable: string) => this.setState({ isAvailable }))
        }
    }

    componentWillUnmount() {
        socket.disconnect();
    }

    componentDidMount() {
        socket = io.connect("http://localhost:3002");
    }

    private formValidation = (): boolean => {
        const errors = { ...this.state.errors };
        errors.firstNameErr = this.state.firstName.length < 1 ? "Please enter your first name" : "";
        errors.lastNameErr = this.state.lastName.length < 1 ? "Please enter your last name" : "";
        errors.userNameErr = this.state.userName.length <= 3 ? "Please enter a username" : "";
        errors.userPassErr = this.state.userPass.length <= 3 ? "Please enter a password" : "";
        if (this.state.isAvailable === "false") {
            errors.userNameErr = "This username is taken";
        }
        this.setState({ errors });
        if (errors.firstNameErr === "" && errors.lastNameErr === "" && errors.userNameErr === "" && errors.userPassErr === "") {
            return true
        }
        return false;
    }

    private handleSubmit = (e: any): void => {
        const isOk = this.formValidation();
        if (isOk) {
            const user = new User("", this.state.firstName, this.state.lastName, this.state.userName, this.state.userPass, "");
            apiRequest("http://localhost:3001/api/users/register", "POST", user);
            this.props.history.push("/users/login");
        }
    }

    render(): JSX.Element {
        return (
            <div className="register">
                <section className="signup">
                    <div className="container">
                        <div className="signup-content">
                            <h2 className="form-title">Create account</h2>
                            <hr />
                            <form>
                                <div className="form-group">
                                    <input className="form-input" type="text" id="firstName" placeholder="First Name..." onChange={this.handleChange} value={this.state.firstName} />
                                    <p>{this.state.errors.firstNameErr}</p>
                                </div>
                                <div className="form-group">
                                    <input className="form-input" type="text" id="lastName" placeholder="Last Name..." onChange={this.handleChange} value={this.state.lastName} />
                                    <p>{this.state.errors.lastNameErr}</p>
                                </div>
                                <div className="form-group">
                                    <input className="form-input" type="text" id="userName" placeholder="Username..." onChange={this.handleChange} value={this.state.userName} />
                                    {this.state.isAvailable === "true" ? <span className="check">&#10004;</span> : this.state.isAvailable === "false" ? <span className="check">&#10006;</span> : <span className="check"></span>}
                                    <p>{this.state.errors.userNameErr}</p>
                                </div>
                                <div className="form-group">
                                    <input className="form-input" type="password" id="userPass" placeholder="Password..." onChange={this.handleChange} value={this.state.userPass} />
                                    <span>{this.state.errors.userPassErr}</span>
                                </div>
                                <button type="button" onClick={this.handleSubmit} className="form-submit">Sign Up</button>
                                {/* <button type="reset" onClick={this.handleClear}>Clear</button> */}
                            </form>
                            {/* <p className="already">Already a user? <NavLink to="/users/login" exact activeClassName="active-link">Login</NavLink></p> */}
                            <p className="loginhere">
                        Have already an account ? <NavLink to="/users/login" exact className="loginhere-link" activeClassName="active-link">Login</NavLink>
                    </p>
                        </div>
                    </div>
                </section>
            </div >
        );
    }
}