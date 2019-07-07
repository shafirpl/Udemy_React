import React, { Component } from "react";
import { NavLink } from 'react-router-dom';


class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-center">
                <ul className="nav nav-tabs">
                    <li className="nav-item"><NavLink activeClassName="active" className="nav-link" exact to="/">Home</NavLink></li>
                    <li className="nav-item"><NavLink activeClassName="active" className="nav-link" exact to="/chips">Chips</NavLink></li>
                    <li className="nav-item"><NavLink activeClassName="active" className="nav-link" exact to="/soda">Soda</NavLink></li>
                    <li className="nav-item"><NavLink activeClassName="active" className="nav-link" exact to="/sardines">Sardines</NavLink></li>
                </ul>
            </nav>
        );
    }
}
export default Navbar;
