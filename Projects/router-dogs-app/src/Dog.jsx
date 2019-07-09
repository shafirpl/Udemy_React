import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Dog.css';

class Dog extends Component{
    render(){
        return(
            <div className="col-md-4 text-center Dog" key={this.props.name}>
                <img src={this.props.src} alt={this.props.name} />
                <h3> <NavLink 
                className="underline"
                exact 
                to={`/dogs/${this.props.name}`}>{this.props.name}</NavLink> </h3>
                
                
            </div>
        );
    }
}
export default Dog;