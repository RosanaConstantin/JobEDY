import React, { Component } from "react";

import UserService from "../services/user.service";
import Typical from 'react-typical'
import ParticlesBg from 'particles-bg'
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
        <Typical
        steps={['Welcome to Jobedy!', 1000, "A place where opportunities find you first!", 1000]}
        loop={Infinity}
        wrapper="p"
      />
          {/* <h3></h3> */}
          <ParticlesBg type="circle" bg={true} />
        </header>
      </div>
    );
  }
}
