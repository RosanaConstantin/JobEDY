import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import ProfileService from "../services/profile.service";
import SmoothList from 'react-smooth-list';
export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
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
  }

  render() {
    const profile = this.state.profile;
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    const { currentUser } = this.state;
    return (
      <div className="container">
        {(this.state.userReady) ?
          <div>
            <header className="jumbotron">
              <h3>
                <strong>User information</strong>
              </h3>
              {(profile) ?
                <div>
                  <Link to={`/profile/${profile._id}`}>
                    <button>
                      Update your profile now!
                    </button>
                  </Link>
                </div> : null}
            </header>
            <p>
              <strong>Platform email:</strong>{" "}
              {currentUser.email}
            </p>
            <p>
              <strong>Username:</strong>{" "}
              {currentUser.username}
            </p>
          </div> : null}
        {(profile) ?

          <div>
        <SmoothList>
            <p>
              <strong>Email:</strong>{" "}
              {profile.email}
            </p>
            <p>
              <strong>Firstname:</strong>{" "}
              {profile.name}
            </p>
            <p>
              <strong>Lastname:</strong>{" "}
              {profile.prename}
            </p>
            <p>
              <strong>Birthdate:</strong>{" "}
              {profile.birthDate}
            </p>
            <p>
              <strong>Gender:</strong>{" "}
              {profile.gender}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {profile.phone}
            </p>

            <p>
              <strong>Country:</strong>{" "}
              {profile.country}
            </p>

            <p>
              <strong>Region:</strong>{" "}
              {profile.region}
            </p>
            <header className="jumbotron">
              <h3>
                <strong>Professional experience</strong>
              </h3>
            </header>
            <p>

              <strong>Education:</strong>{" "}
              {profile.education}
            </p>
            <p>
              <strong>Skills:</strong>{" "}
              {profile.skills}
            </p>
            <p>
              <strong>Departament:</strong>{" "}
              {profile.department}
            </p>

            <p>
              <strong>Industry:</strong>{" "}
              {profile.industry}
            </p>

            <p>
              <strong>Experience:</strong>{" "}
              {profile.experience}
            </p>

            <p>
              <strong>Type:</strong>{" "}
              {profile.type}
            </p>
            </SmoothList>
          </div> :
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
        }
      </div>
    );
  }
}
