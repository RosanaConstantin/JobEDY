import React, { Component } from "react";
import Table from "./table.component";
import { Redirect, Link } from "react-router-dom";
import ApplicationService from "../services/application.service";
import AuthService from "../services/auth.service";
import ProfileService from "../services/profile.service";
import * as _ from "lodash"

class BoardApplication extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            profile: {},
            currentUser: { username: "" }
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
        ApplicationService.getApplicationBoard().then(
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
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        //Keys i want in application
        const keys = ["_id", "firstname", "lastname", "jobId", "status", "matchingScore"];
        let items = this.state.content;;
        if (!profile) {
            return (
                <div>
                    <p>
                        <strong>You have not complete your profile. Please do it to be able to apply! </strong>
                    </p>
                    <Link to={`/profile/create`}>
                        <button>
                            Complete your profile now!
                        </button>
                    </Link>
                </div>
            )
        }
        if (!profile.recruiterProfile) {
            items = _.filter(items, (item) => item.userId === this.state.currentUser.id)
        }
        if (items.length > 0) {
            return (
                <div className="container">
                    <header className="jumbotron">
                        <Table isJob="false" items={items} profile={profile} keys={keys} />
                    </header>
                </div>

            );
        } else {
            return (<div className="container">
                <header className="jumbotron">
                    <h3>You don't have any application. Check your profile, apply and see your applications</h3>

                </header>
            </div>
            );
        }
    }
}
export default BoardApplication