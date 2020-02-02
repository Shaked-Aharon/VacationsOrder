import React, { Component } from "react";
import "./vacationModal.css";
import { Modal, Button } from 'react-bootstrap';
import { Vacation } from "../../models/vacation";
import { apiRequestWithImg } from "../../utils/Helper";

interface VacationModalProps {
    type: string;
    vacation: Vacation;
    emitChanges: any;
}

interface VacationModalState {
    show: boolean;
    type: string;
    vacation: Vacation;
    img: any;
    loaded: any;
    errors: {
        imgErr: string,
        destinationErr: string,
        descriptionErr: string,
        startErr: string,
        endErr: string,
        priceErr: string
    };
}

export class VacationModal extends Component<VacationModalProps, VacationModalState> {

    constructor(props: any) {
        super(props);
        this.state = {
            show: false,
            type: "",
            vacation: new Vacation("", "", "", "", "", "", 0),
            img: "",
            loaded: "",
            errors: {
                imgErr: "",
                destinationErr: "*",
                descriptionErr: "*",
                startErr: "*",
                endErr: "*",
                priceErr: "*"
            }
        }
    }

    public setDestination = (e: any): void => {
        const value = e.target.value;
        const errors = { ...this.state.errors };
        errors.destinationErr = value.length === 0 ? "Please enter a Destination" : value.length <= 3 ? "Destination field is too short" : "";
        const vacation = { ...this.state.vacation };
        vacation.destination = value;
        this.setState({ vacation, errors });
    }
    public setDescription = (e: any): void => {
        const errors = { ...this.state.errors };
        const value = e.target.value;
        errors.descriptionErr = value.length === 0 ? "Please enter a Description" : value.length < 16 ? "minimun 16 letters" : "";
        const vacation = { ...this.state.vacation };
        vacation.description = e.target.value;
        this.setState({ vacation, errors });
    }
    public setPrice = (e: any): void => {
        const errors = { ...this.state.errors };
        const value = e.target.value;
        errors.priceErr = value === 0 ? "Please enter a Price" : "";
        const vacation = { ...this.state.vacation };
        vacation.price = e.target.value;
        this.setState({ vacation, errors });
    }

    public setStart = (e: any): void => {
        const errors = { ...this.state.errors };
        const value = e.target.value;
        errors.startErr = value === "" ? "Stating Date is missing" : "";
        const vacation = { ...this.state.vacation };
        vacation.start = e.target.value;
        this.setState({ vacation, errors });
    }

    public setEnd = (e: any): void => {
        const errors = { ...this.state.errors };
        const value = e.target.value;
        errors.endErr = value === "" ? "Ending Date is missing" : "";
        const vacation = { ...this.state.vacation };
        vacation.end = e.target.value;
        this.setState({ vacation, errors });
    }

    public setImg = (e: any): void => {
        if (this.state.type === "Add") {
            const errors = { ...this.state.errors };
            const value = e.target.files;
            errors.imgErr = value.length === 0 ? "Please Choose an image" : "";
        }
        this.setState({ img: e.target.files[0] });
    }

    componentDidMount(): void {
        this.setState({
            vacation: this.props.vacation,
            type: this.props.type
        });
    }

    public handleClose = () => this.setState({ show: false });
    public handleShow = () => this.setState({ show: true });

    public handleSubmit = async () => {
        const errors: any = { ...this.state.errors };
        const type = this.state.type;
        if (this.state.img === "" && type !== "Edit") {
            return;
        }
        if(type === "Add"){
            for (const prop in errors) {
                if (prop === "imgErr") {
                    continue;
                }
                if (errors[prop] !== "") {
                    return;
                }
            }
        }
        const vacation = { ...this.state.vacation };
        const img = this.state.img;
        const data = new FormData();
        data.append("vacationImage", img);
        data.append("vacation", JSON.stringify(vacation));
        if (this.state.type === "Edit") {
            data.append("type", this.state.type);
            apiRequestWithImg("http://localhost:3001/api/vacations", "POST", data);
            this.props.emitChanges();
            this.handleClose();
        } else {
            this.props.emitChanges();
            this.handleClose();
            apiRequestWithImg("http://localhost:3001/api/vacations", "POST", data);
        }
    }

    render(): JSX.Element {
        return (
            <div className="vacation-modal">
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.type} Vacation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.type === "Edit" && <p>in case you dont want to change img leave the field empty</p>}
                        <span>You need to fill all the field</span>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Destination:</td>
                                    <td><input id="destination" type="text" value={this.state.vacation.destination} onChange={this.setDestination} />
                                        <span className="input-errors">{this.state.errors.destinationErr}</span></td>
                                </tr>
                                <tr>
                                    <td>Description:</td>
                                    <td><textarea id="description" value={this.state.vacation.description} onChange={this.setDescription}></textarea>
                                        <span className="input-errors">{this.state.errors.descriptionErr}</span></td>
                                </tr>
                                <tr>
                                    <td>from:</td>
                                    <td><input id="start" type="date" value={this.state.vacation.start} onChange={this.setStart} />
                                        <span className="input-errors">{this.state.errors.startErr}</span></td>
                                </tr>
                                <tr>
                                    <td>to:</td>
                                    <td><input id="end" type="date" value={this.state.vacation.end} onChange={this.setEnd} />
                                        <span className="input-errors">{this.state.errors.endErr}</span></td>
                                </tr>
                                <tr>
                                    <td>Price:</td>
                                    <td><input id="price" type="number" value={this.state.vacation.price} onChange={this.setPrice} />
                                        <span className="input-errors">{this.state.errors.priceErr}</span></td>
                                </tr>
                                <tr>
                                    <td>img:</td>
                                    <td><input id="image" type="file" accept="image/*" name="vacationImage" onChange={this.setImg} />
                                        <span className="input-errors">{this.state.errors.imgErr}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleSubmit}>
                            {this.state.type === "Add" ? "Add" : "Save Changes"}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}