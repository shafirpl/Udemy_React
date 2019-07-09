import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

/*
* Since we are using bootstrap navbar, we didn't need to 
* add activeClassName here, just using NavLink is more than good enough.
* Bootstrap will automatically take care of the active class here
*/

class Navbar extends Component {
    render() {
        const dogLinks = this.props.dogs.map(dog => (
            <li className="nav-item">
                <NavLink 
                key = {dog.name}
                exact 
                to={`/dogs/${dog.name}`} 
                className="nav-link">{dog.name}</NavLink>
            </li>
        ));
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <NavLink  exact to="/dogs" className="navbar-brand"> Dog App </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item"> 
                            <NavLink exact to="/dogs" className="nav-link">Home</NavLink> 
                         </li>
                        {dogLinks}
                    </ul>
                </div>
            </nav>
        );
    }
}
export default Navbar;