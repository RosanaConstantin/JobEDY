import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardJob from "./components/job.component";
import BoardApplication from "./components/application.component";
import BoardAdmin from "./components/board-admin.component";
import ApplicationDetailPage from "./components/application.detail.component";
import JobDetail from "./components/job.detail.component";
import ProfileForm from "./components/profile.form.component";
import JobForm from "./components/job.form.component";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Jobedy
          </Link>
          <div className="navbar-nav mr-auto">
            {/* <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li> */}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}
            {/* {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )} */}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/jobs"} className="nav-link">
                  Jobs
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/applications"} className="nav-link">
                  Applications
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
        <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/profile/create" component={ProfileForm} />
              <Route exact path="/profile/:id" component={ProfileForm} />
              <Route exact path={`/jobs`} component={BoardJob} />
              <Route exact path={`/jobs/create`} component={JobForm} />
              <Route exact path={`/jobs/update/:id`} component={JobForm} />
              <Route exact path={`/jobs/:id`}  component={JobDetail} />
              <Route path="/user" component={BoardUser} />
              <Route exact path={`/applications`} component={BoardApplication} />
              <Route exact path={`/applications/:id`}  component={ApplicationDetailPage} />
              <Route path="/admin" component={BoardAdmin} />
            </Switch>
        </div>
      </div>
    );
  }
}

export default App;
