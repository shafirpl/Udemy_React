import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './DogDetails.css';


class DogDetails extends Component{
    render(){
        let {dog} = this.props;
        return(
 
                <div className="DogDetails row justify-content-center mt-5">
                    <div className="col-11 col-lg-5">
                        <div className="DogDetails-card card">
                            <img className="card-img-top img-fluid" src={dog.src} alt={dog.name} />
                            <div className="card-body">
                                <h2 className="card-title">{dog.name}</h2>
                                <h4 className="card-subtitle text-muted">{dog.age} yeard old</h4>
                            </div>
                            {/* key is not necessary here, it will compile without key
                            however,if we go to developer console, it will give us a 
                            warning, that is why we need the key */}
                            <ul className="list-group list-groud-flush">
                                {dog.facts.map((fact,i) => (
                                    <li className="list-group-item" key={i}>{fact}</li> )
                                )}
                            </ul>
                            <div className="card-body">
                                <Link className="btn btn-info" exact to="/dogs">Go Back</Link>
                            </div>
                        </div>
                    </div>
                </div>

        );
    }
}


export default DogDetails;