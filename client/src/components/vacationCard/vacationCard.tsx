import React, { Component } from "react";
import "./vacationCard.css";
import { Vacation } from "../../models/vacation";
import { FollowButton } from "../followButton/followButton";
import { store } from "../../redux/store";
import { VacationModal } from "../vacationModal/vacationModal";
import { Modal } from "react-bootstrap";

interface VacationCardProps {
    vacation: Vacation;
    isFollowed: boolean;
    handleDelete: any;
    emitChanges: any;
}

interface VacationCardState {
    startMonthName: string | number;
    endMonthName: string | number;
    show: boolean;
}
export class VacationCard extends Component<VacationCardProps, VacationCardState> {

    public monthNames: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    constructor(props: any) {
        super(props);
        this.state = {
            show: false,
            startMonthName: this.monthNames[parseInt(this.props.vacation.start.split("-")[1]) - 1],
            endMonthName: this.monthNames[parseInt(this.props.vacation.end.split("-")[1]) - 1]
        }
    }

    public followClicked = (): void => {
        this.setState({})
    }

    public handleClose = () => this.setState({ show: false });
    public handleShow = () => this.setState({ show: true });
    public handleShow2 = () => this.modal.handleShow();

    public modal: any;

    render(): JSX.Element {
        const currentUser = { ...store.getState().currentUser };
        return (
            <div className={`vacation-card ${(this.props.isFollowed === true ? "followed" : "not-followed")} `} id={this.props.vacation.id}>
                <VacationModal ref={modal => this.modal = modal} type="Edit" vacation={this.props.vacation} emitChanges={this.props.emitChanges} />
                <div className="vacation-img">
                    <img src={`/assets/images/${this.props.vacation.img}`} alt="img" />
                </div>
                <div className="vacation-details">
                    <div className="card-header ">
                        <h3>{this.props.vacation.destination}</h3>
                        <div className="header-btn">
                            {currentUser.isAdmin ? <span className="admin-control"><button onClick={this.handleShow2}>&#10002;</button><button onClick={this.handleShow}>&#10060;</button></span> : <FollowButton isFollowed={this.props.isFollowed} userId={currentUser.id} vacationId={this.props.vacation.id} followClicked={this.followClicked.bind(this)} />}
                            {/* {currentUser.isAdmin ? <span><button onClick={this.handleShow2}>&#10002;</button><button onClick={this.props.handleDelete.bind(this, this.props.vacation)}>&#10060;</button></span> : <FollowButton isFollowed={this.props.isFollowed} userId={currentUser.id} vacationId={this.props.vacation.id} followClicked={this.followClicked.bind(this)} />} */}
                        </div>
                    </div>
                    <div className="more-info">
                        <p className="description">{this.props.vacation.description}</p>

                        <div className="date">
                            <div className="start-date">{this.props.vacation.start.split("-")[2]}<br />{this.state.startMonthName}</div>
                            <span>- - - - - - - - ></span>
                            <div className="end-date">{this.props.vacation.end.split("-")[2]}<br />{this.state.endMonthName}</div>
                        </div>
                        <span className="price">${this.props.vacation.price}</span>
                    </div>
                </div>

                <Modal show={this.state.show} onHide={this.handleClose} className="delete-modal">
                    <Modal.Header closeButton>
                        <Modal.Title> Pay Attention </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this vacation?
                        <br />
                        <button className="btn btn-danger" onClick={this.props.handleDelete.bind(this, this.props.vacation)}>Yes</button>
                        <button className="btn btn-secondary" onClick={this.handleClose}>No</button>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}