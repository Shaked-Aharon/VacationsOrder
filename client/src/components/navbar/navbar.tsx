import React, { Component } from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import { CurrentUser } from "../../models/currentUser";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/actionType";

interface NavbarProps {
    currentUser: CurrentUser;
}

export class Navbar extends Component<NavbarProps, any>{

    public submitLogout = (): void => {
        const action = { type: ActionType.logoutCurrentUser, payload: false };
        store.dispatch(action);
        localStorage.removeItem("token");
    }

    render(): JSX.Element {
        return (
            <div className="navbar">
               
                {this.props.currentUser.isAdmin ? <NavLink to="/vacations/reports">Reports</NavLink> : ""}
                <NavLink className="vacations-button btn btn-info" to="/vacations">Vacations</NavLink>
                {/* <NavLink to="/users/login" className="btn btn-secondary" onClick={this.submitLogout}>Log-Out</NavLink> */}
            </div>
        );
    }
}