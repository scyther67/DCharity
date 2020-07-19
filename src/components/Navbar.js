import React, { Component } from 'react';
import { Link } from 'react-router-dom';    

class Navbar extends Component{
  constructor(props) {
    super(props)
  }
    render() {
        return(
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <Link
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            to="/"
            // target="_self"
            // rel="noopener noreferrer"
          >DCharity</Link> 
        </nav>
        )}
}

export default Navbar;