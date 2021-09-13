import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../css/Table.css';

export default class Table extends Component {
   constructor(props) {
      super(props);
      this.state = {
         items: this.props.items,
         currentPage: 1,
         itemsPerPage: 5,
         pageCount: 0,
         keys: this.props.keys,
         isJob: this.props.isJob
      };
      this.handleClick = this.handleClick.bind(this);
   }

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
      const path = this.state.isJob === "true" ? 'jobs' : 'applications';
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
      const { items, currentPage, itemsPerPage } = this.state;
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
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
      return (

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
      );
   }
}
