import React, { Component, useReducer, useState, useEffect } from "react";

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
            data: [],
            filteredData: [],
            currentPage: 1,
            itemsPerPage: 5,
            pageCount: 0,
            keys: ["_id", "name", "region", "country", "status", "industry", "department"],
        };
      this.handleClick = this.handleClick.bind(this);

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
                const data = response.data;
                this.setState({
                    data,
                    filteredData: data
                });
            },
            error => {
                this.setState({
                    data:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    handleInputChange = event => {
        const query = event.target.value;
        const filteredData = this.state.data.filter(element => {
            return element.name.toLowerCase().includes(query.toLowerCase());
        });

        this.setState({
            data: filteredData,
            filteredData
        });
    };
    handleClick(event) {
        this.setState({
           currentPage: Number(event.target.id)
        });
     }
     renderTableHeader() {
        let header = this.state.keys;
        return header.map((key, index) => {
           if (key !== "_id") {
              if (key === "openPositions") {
                 const keyT = "OPEN POSITIONS";
                 return <th key={index}>{keyT}</th>;
              }
              return <th key={index}>{key.toUpperCase()}</th>;
           }
           return null;
        });
     }
  
     renderTableData(tableData) {
        let counter = 0;
        const path = "jobs"
        return tableData.map((item) => {
           return (
  
              <tr key={item._id}>
                 {
                    this.state.keys.map((key) => {
                       if (key !== "_id")
                          return <td key={counter++}>{item[key]}</td>
                    })
                 }
                 <td>
                    <Link
                       to={{
                          pathname: `/${path}/${item._id}`
                       }}>
                       <button>Show details</button></Link>
                 </td>
              </tr>
           );
        });
     }
    render() {
        const { filteredData, currentPage, itemsPerPage } = this.state;
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
           pageNumbers.push(i);
        }
  
        const renderPageNumbers = pageNumbers.map(number => {
           return (
              <div
                 key={number}
                 id={number}
                 className="page"
                 onClick={this.handleClick}
              >
                 {number}
              </div>
           );
        });
        const profile = this.state.profile;

        const keys = ["_id", "name", "region", "country", "status", "industry", "department"];
        const items = this.state.filteredData;
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
                        <div>
                            <form>
                                <input
                                    placeholder="Search for..."
                                    value={this.state.query}
                                    onChange={this.handleInputChange}
                                />
                            </form>
                        </div>

                        <div>
                            <h1 id="title">{this.state.title}</h1>
                            <table id="tables">
                                <tbody>
                                    <tr>{this.renderTableHeader()}
                                        <th key={this.state.keys.length}></th>
                                    </tr>
                                    {this.renderTableData(currentItems)}
                                </tbody>
                            </table>
                            <div id="page-numbers">
                                {renderPageNumbers}
                            </div>
                        </div>
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