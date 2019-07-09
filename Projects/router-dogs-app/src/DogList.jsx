import React, { Component } from 'react';
import Dog from './Dog.jsx';

import './DogList.css';

class DogList extends Component {
    render() {
        return (
            <div className="DogList">
                {/* 
                * my-5 is equivalent to mt-5 and mb-5, it 
                * adds 5 pixels of margin top and margin bottom 
                * to the element
                */}
                <h1 className="display-1 text-center my-5">Dog List</h1>
                    <div className="row">
                        {this.props.dogs.map(d => {
                            return (<Dog
                                key={d.name}
                                src={d.src}
                                name = {d.name}
                            />)
                        })}

                    </div>
            </div>
        );
    }
}

export default DogList;
