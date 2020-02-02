import React, { Component } from "react";
import "./vacationReports.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { store } from "../../redux/store";
import { Unsubscribe } from "redux";
import { CurrentUser } from "../../models/currentUser";


interface VacationReportsState {
    show: boolean;
    data: [{}];
    currentUser: CurrentUser;
}

export class VacationReports extends Component<any, VacationReportsState>{

    private unsubscribeStore: Unsubscribe;

    public _isMounted: boolean = false;

    constructor(props: any) {
        super(props);
        this.state = {
            show: false,
            data: [{}],
            currentUser: { ...store.getState().currentUser }
        };

        this.unsubscribeStore = store.subscribe(() => {
            if (this._isMounted === true) {
                this.setState({
                    currentUser: { ...store.getState().currentUser }
                });
            }
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount(): void {
        this._isMounted = true;
        fetch("http://localhost:3001/api/follows")
            .then(response => response.json())
            .then(data => {
                if (this._isMounted === true) {

                    this.setState({
                        data,
                        currentUser: { ...store.getState().currentUser }
                    });
                }
            });
    }

    public reports: any = document.getElementById('reports-modal');

    public changeRoute = () => {
        this.props.history.push("/vacations");
    }

    render(): JSX.Element | any {
        if (this.state.currentUser.isAdmin) {
            return (
                <div className="vacation-reports-div">
                    <div className="vacation-reports" style={{ width: 800, height: 500 }}>
                        <div className="container" style={{ width: 800, height: 500 }}>
                            <button className="go-back btn btn-secondary" onClick={this.changeRoute}>Go Back</button>
                            <ResponsiveContainer>
                                <BarChart width={800} height={500} data={this.state.data}>
                                    <XAxis dataKey="name" stroke="#8884d8" />
                                    <YAxis />
                                    <Tooltip />
                                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                    <Bar dataKey="follows" fill="#8884d8" barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            );
        } else {
            this.props.history.push("/vacations");
        }
    }
}