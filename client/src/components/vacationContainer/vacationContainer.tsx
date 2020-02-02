import React, { Component } from "react";
import "./vacationContainer.css";
import { Vacation } from "../../models/vacation";
import { Unsubscribe } from "redux";
import { store } from "../../redux/store";
import { apiRequest } from "../../utils/Helper";
import { ActionType } from "../../redux/actionType";
import { VacationCard } from "../vacationCard/vacationCard";
import { CurrentUser } from "../../models/currentUser";
import io from "socket.io-client";
import { VacationModal } from "../vacationModal/vacationModal";
import { NavLink, Redirect } from "react-router-dom";
let socket: any;



interface VacationContainerState {
    vacations: Vacation[];
    followedVacations: string[];
    currentUser: CurrentUser;
    vacationToEdit: any;
    modalType: string;
}

export class VacationContainer extends Component<any, VacationContainerState> {


    private unsubscribeStore: Unsubscribe;

    public _isMounted: boolean = false;

    constructor(props: any) {
        super(props);
        this.state = {
            vacations: store.getState().vacations,
            followedVacations: store.getState().followedVacations,
            currentUser: { ...store.getState().currentUser },
            vacationToEdit: undefined,
            modalType: ""
        }

        this.unsubscribeStore = store.subscribe(() => {
            if (this._isMounted === true) {
                this.setState({
                    vacations: store.getState().vacations,
                    currentUser: { ...store.getState().currentUser },
                    followedVacations: store.getState().followedVacations
                });
            }
        });
    }

    public handleDelete = (vacation: Vacation): void => {
        apiRequest("http://localhost:3001/api/vacations", "DELETE", vacation);
        const updatedVacations = this.state.vacations;
        const indexOf = updatedVacations.indexOf(vacation);
        updatedVacations.splice(indexOf, 1);
        socket.emit("admin-made-changes");
    }

    public emitChanges = async () => {
        await socket.emit("admin-made-changes");

    }

    public modal: any;
    public modalReports: any;

    componentWillUnmount() {
        this._isMounted = false;
        socket.disconnect();
    }

    public reports: any

    async componentDidMount() {
        this.modal = {...this.modal};
        this._isMounted = true;
        socket = io.connect("http://localhost:3002");
        await socket.on("admin-made-changes", async (vacations: Vacation[]) => {
            const getVacations = await apiRequest("http://localhost:3001/api/vacations", "GET");
            const action = { type: ActionType.getAllVacations, payload: getVacations };
            store.dispatch(action);
            this.setState({
                vacations: store.getState().vacations
            });
        });

        if (this.state.followedVacations.length === 0) {
            const followedVacations = await apiRequest(`http://localhost:3001/api/follows/${this.state.currentUser.id}`, "GET");
            const action = { type: ActionType.getFollowedVacations, payload: followedVacations };
            store.dispatch(action);
            if (this._isMounted === true) {
                this.setState({ followedVacations: followedVacations });
            }
        }

        if (store.getState().vacations.length === 0) {
            const vacations = await apiRequest("http://localhost:3001/api/vacations", "GET");
            const action = { type: ActionType.getAllVacations, payload: vacations };
            store.dispatch(action);
        }
    }

    public changeRoute = () => {
        this.props.history.push("/vacations");
    }

    render(): JSX.Element {
        return (
            <div className="vacation-container">
                <VacationModal ref={modal => this.modal = modal} emitChanges={this.emitChanges.bind(this)} type="Add" vacation={new Vacation("", "", "", "", "", "", 0)} />
                {this.state.currentUser.isAdmin ? <NavLink to="/vacations/reports" className="reports-button btn btn-info" >Reports</NavLink> : ""}
                {/* {this.state.currentUser.isAdmin ? <button className="reports-button btn btn-info" onClick={() => {this.props.history.push("vacations/reporpts")}} >Vacations Reports</button> : ""} */}
                {this.state.currentUser.isAdmin ? this.modal !== undefined ? <button className="add-button btn btn-info" onClick={this.modal.handleShow}  >Add Vacation</button> : <Redirect to="/vacations" /> : ""}
                {
                    this.state.vacations.map(vacation => {
                        const isFollowed = this.state.followedVacations.indexOf(vacation.id.toString()) >= 0 ? true : false;
                        return <VacationCard emitChanges={this.emitChanges.bind(this)} vacation={vacation} key={vacation.id} isFollowed={isFollowed} handleDelete={this.handleDelete} />;
                    })
                }
            </div>
        );
    }
}