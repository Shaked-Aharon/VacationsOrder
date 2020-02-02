import React, { Component } from "react";
import "./homePage.css";
import { Route } from "react-router";
import { VacationContainer } from "../vacationContainer/vacationContainer";
import { CurrentUser } from "../../models/currentUser";
import { Unsubscribe } from "redux";
import { store } from "../../redux/store";
import { apiTokenVerification } from "../../utils/Helper";
import { ActionType } from "../../redux/actionType";
import { VacationReports } from "../vacationReports/vacationReports";
import NavLink from "react-bootstrap/NavLink";

interface HomePageState {
    currentUser: CurrentUser;
}

export class HomePage extends Component<any, HomePageState> {

    private unsubscribeStore: Unsubscribe;

    public _isMounted: boolean = false;

    constructor(props: any) {
        super(props);
        this.state = {
            currentUser: { ...store.getState().currentUser }
        }

        this.unsubscribeStore = store.subscribe(() => {
            if (this._isMounted) {
                this.setState({
                    currentUser: { ...store.getState().currentUser }
                });
            }
        })
    }

    public handleRefresh = async () => {
        let token = localStorage.token, payload;
        if (token) {
            token = JSON.stringify(token);
            payload = await apiTokenVerification(token);
        }
        const action = { type: ActionType.getCurrentUser, payload: payload };
        store.dispatch(action);
        if (!payload) {
            this.props.history.push("/users/login");
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        await this.handleRefresh();
    }

    public submitLogout = (): void => {
        const action = { type: ActionType.logoutCurrentUser, payload: {} };
        store.dispatch(action);
        localStorage.removeItem("token");
        this.props.history.push("/users/login");
    }

    componentWillUnmount(): void {
        this._isMounted = false;
        this.unsubscribeStore = store.subscribe(() => { return; });
    }

    render(): JSX.Element {
        return (
            <div className="home-page">
                <div className="header">
                    <div className="title">
                        <NavLink to="/users/login" className="btn btn-secondary logout" onClick={this.submitLogout}>Log-Out</NavLink>
                        <h1>MyNextTrip</h1>
                        <span>lowest prices beautiful places best vacation</span>
                    </div>
                    <div className="navbar2">
                        <h2>Live Your Dream Today</h2>
                    </div>
                </div>
                <div className="main">
                    <Route exact path="/vacations/reports" component={VacationReports} />
                    <Route exact path="/vacations" component={VacationContainer} />
                </div>
            </div>
        );
    }
}