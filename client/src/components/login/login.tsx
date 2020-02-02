import React, { Component } from "react";
import "./login.css";
import { User } from "../../models/user";
import { apiRequest } from "../../utils/Helper";
import { ActionType } from "../../redux/actionType";
import { store } from "../../redux/store";
import { NavLink } from "react-router-dom";

interface LoginSate {
    error: string;
    userName: string;
    userPass: string;
}

export class Login extends Component<any, LoginSate>{

    constructor(props: any) {
        super(props);
        this.state = {
            error: "",
            userName: "",
            userPass: ""
        };
    }

    public handleChange = (e: any): void => {
        this.setState({
            [e.target.id]: e.target.value
        } as any);
    }

    private handleSubmit = async () => {
        const user = new User("", "", "", this.state.userName, this.state.userPass, "");
        const fetchUser = await apiRequest("http://localhost:3001/api/users/login", "POST", user);
        if (fetchUser) {
            if (typeof fetchUser === "string") {
                this.setState({ error: fetchUser });
                return;
            }
            const action = { type: ActionType.getCurrentUser, payload: fetchUser.payload };
            store.dispatch(action);
            localStorage.setItem("token", fetchUser.token);
            this.props.history.push("/vacations");
        }
    }

    render(): JSX.Element {
        return (
            <div className="login">
                <section className="signin">
                    <div className="container">
                        <div className="signin-content">
                            <h2 className="form-title">Sign-In</h2>
                            <hr />
                            <form>
                                <p>{this.state.error}</p>
                                <div className="form-group">
                                    <input placeholder="Username..." className="form-input" type="text" id="userName" onChange={this.handleChange} value={this.state.userName} />
                                </div>
                                <div className="form-group">
                                    <input placeholder="Password..." className="form-input" type="password" id="userPass" onChange={this.handleChange} value={this.state.userPass} />
                                </div>
                                <button className="form-submit" type="button" onClick={this.handleSubmit}>Sign-In</button>
                            </form>
                            {/* <span>Dont have a User? <NavLink to="/users/register" exact activeClassName="active-link">Register</NavLink></span> */}
                            <p className="registerhere">
                        Dosent have an account ? <NavLink to="/users/register" className="registerhere-link" exact activeClassName="active-link">Register</NavLink>
                    </p>
                        </div >
                    </div>
                </section>
            </div>
        );
    }
}