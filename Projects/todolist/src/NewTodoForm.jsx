import React, { Component } from 'react';
import uuid from 'uuid/v4';
import './NewTodoForm.css';


class NewTodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = { task: "" };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    handleSubmit(evt){
        evt.preventDefault();
        const newTodo = {...this.state, id:uuid(), completed: false};
        this.props.createTodo(newTodo);
        this.setState({
            task:""
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="task">New Todo</label>
                <input
                    id="task"
                    name = "task"
                    type="text"
                    placeholder="New Todo"
                    value={this.state.task}
                    onChange = {this.handleChange}
                />
                <button>Add Todo</button>
            </form>
        );
    }
}

export default NewTodoForm;