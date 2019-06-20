import React, { Component } from "react";
import uuid from "uuid/v4";

class NewBoxForm extends Component {
    constructor(props) {
        super(props);
        this.state = { height: "", width: "", color: "" };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    /*
    * We passed the create function which is in charge of 
    * creating boxes from BoxList to here. Now we are calling
    * that function and passing parameter to create the new 
    * box
    * 
    */
    handleSubmit(evt) {
        //this is to make sure the form doesn't get 
        //refreshed on submit
        evt.preventDefault();
        const newBox = {...this.state, id: uuid()};
        this.props.createBox(newBox);
        //reseting the state after submit
        // this will also reset the form inputs 
        // so after submit we won't see the old values

        this.setState({
            height: "", width: "", color: ""
        });
    }
    render() {
        return (
            <form action="" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="height">Height</label>
                    <input
                        type="text"
                        className="form-control"
                        name="height"
                        value={this.state.height}
                        id="height"
                        onChange={this.handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="width">Width</label>
                    <input
                        type="text"
                        className="form-control"
                        name="width"
                        value={this.state.width}
                        id="width"
                        onChange={this.handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="color">Color</label>
                    <input
                        type="text"
                        className="form-control"
                        name="color"
                        value={this.state.color}
                        id="color"
                        onChange={this.handleChange} />
                </div>
                <button className="btn btn-primary">Add New Box</button>
            </form>
        )
    }
}

export default NewBoxForm;