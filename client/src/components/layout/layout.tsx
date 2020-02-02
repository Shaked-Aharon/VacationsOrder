import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./layout.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { HomePage } from "../homePage/homePage";
import { Login } from "../login/login";
import { Register } from "../register/register";

export class Layout extends Component{


    render(): JSX.Element{
        return(
            <div className="layout">
                <BrowserRouter>
                    <Switch>
                        <Route path="/users/login" component={Login}/>
                        <Route path="/users/register" component={Register}/>
                        <Route path="/" component={HomePage}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}