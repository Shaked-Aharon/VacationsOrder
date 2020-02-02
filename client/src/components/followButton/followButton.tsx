import React, { Component } from "react";
import "./followButton.css";
import { Follow } from "../../models/follow";
import { apiRequest } from "../../utils/Helper";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/actionType";
import { Unsubscribe } from "redux";

interface FollowButtonProps {
    isFollowed: boolean;
    userId: string;
    vacationId: string;
    followClicked: any
}

interface FollowButtonState {
    isFollowed: boolean;
    followedVacations: string[];
}

export class FollowButton extends Component<FollowButtonProps, FollowButtonState>{

    public unsubscribeStore: Unsubscribe;

    public _isMounted: boolean = false;


    constructor(props: any) {
        super(props);
        this.state = {
            followedVacations: store.getState().followedVacations,
            isFollowed: false
        }

        this.unsubscribeStore = store.subscribe(() => {
            if (this._isMounted) {
                this.setState({
                    followedVacations: store.getState().followedVacations
                });
            }
        });
    }

    public handleFollow = async (e: any) => {
        const follow = new Follow("", this.props.vacationId, this.props.userId);
        const isFollowed = this.state.followedVacations.indexOf(this.props.vacationId.toString()) === -1 ? false : true;
        console.log(store.getState().followedVacations);
        if (isFollowed) {
            await apiRequest("http://localhost:3001/api/follows", "DELETE", follow);
            if (this._isMounted) {
                this.setState({ isFollowed: false });
            }
        } else {
            await apiRequest("http://localhost:3001/api/follows", "POST", follow);
            if (this._isMounted) {
                this.setState({ isFollowed: true });
            }
        }
        const followedVacations = await apiRequest(`http://localhost:3001/api/follows/${this.props.userId}`, "GET");
        const action = { type: ActionType.getFollowedVacations, payload: followedVacations };
        store.dispatch(action);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async componentDidMount() {
        this._isMounted = true;
        let followedVacations = store.getState().followedVacations;
        const currentUser = { ...store.getState().currentUser };
        if (followedVacations.length === 0) {
            followedVacations = await apiRequest(`http://localhost:3001/api/follows/${currentUser.id}`, "GET");
            const action = { type: ActionType.getFollowedVacations, payload: followedVacations };
            store.dispatch(action);
        }
        const isFollowed = followedVacations.indexOf(this.props.vacationId.toString()) !== -1 ? true : false;
        if (this._isMounted) {
            this.setState({ isFollowed })
        }
    }


    render(): JSX.Element {
        // const isFollowed = this.state.followedVacations.indexOf(this.props.vacationId.toString()) !== -1 ? true : false;
        const followedBtnClass = `follow-btn ${this.state.isFollowed ? "followed" : "not-followed"}`;
        return (
            <button className={followedBtnClass} onClick={this.handleFollow}>&#9825;</button>
        );
    }
}