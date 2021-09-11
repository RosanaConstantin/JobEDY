import React, { Component } from "react";
import Table from "./table.component";
import { Link } from "react-router-dom";
import JobService from "../services/job.service";
import AuthService from "../services/auth.service";
import ProfileService from "../services/profile.service";

class BoardJob extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: {},
            currentUser: { username: "" },
            content: ""
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true })
        if (!currentUser.profileId) {
            this.setState({
                profile: null
            });
        } else {
            ProfileService.getProfile(currentUser.profileId).then(
                response => {
                    this.setState({
                        profile: response.data
                    });
                },
                error => {
                    this.setState({
                        profile:
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString()
                    });
                }
            );
        }
        JobService.getJobBoard().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        const profile = this.state.profile;
        //Keys i want in application
        const keys = ["_id", "name", "region", "country", "status", "industry", "department"];
        const items = this.state.content;
        if (items.length > 0) {
            return (<>
                <div className="container">
                    <header className="jumbotron">
                        {!profile && <div>
                            <p>
                                <strong>You have not complete your profile. Please do it to be able to apply! </strong>
                            </p>
                            <Link to={`/profile/create`}>
                                <button>
                                    Complete your profile now!
                                </button>
                            </Link>
                        </div>}
                        {profile && profile.recruiterProfile &&
                            <Link to={`/jobs/create`}>
                                <button>Create job</button>
                            </Link>}
                        <Table isJob="true" items={items} keys={keys} />
                    </header>
                </div>
            </>
            );
        } else {
            return (
                <>
                    <div className="container">
                        <header className="jumbotron">
                            {!profile && <div>
                                <p>
                                    <strong>You have not complete your profile. Please do it to be able to apply! </strong>
                                </p>
                            </div>}
                            {profile && profile.recruiterProfile &&
                            <Link to={`/jobs/create`}>
                                <button>Create job</button>
                            </Link>}
                            <h3>No available job positions right now</h3>

                        </header>
                    </div>
                </>
            );
        }
    }
}
export default BoardJob