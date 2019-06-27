import React, { Component } from 'react';
import Todo from './Todo.jsx';
import NewTodoForm from './NewTodoForm.jsx';
import "./TodoList.css";

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = { todos: [] };
        this.create = this.create.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.toggleCompletion = this.toggleCompletion.bind(this);
    }


    create(newTodo) {
        this.setState({
            todos: [...this.state.todos, newTodo]
        })
    }

    remove(id) {
        this.setState({
            todos: this.state.todos.filter(t => t.id !== id)
        });
    }

    update(id, updatedTask) {
        // remember it is a common practice in react that
        // instead of overwriting the exisitign state directly
        // we first create a clone/copy of the old state, overwrite
        // necessary stuff in the clone and only then we 
        // use setState to make the clone equal to the state
        const updatedTodos = this.state.todos.map(
            /*
            * So what is going on here is that we are creating
            * a new array, and then we are running for each
            * individual element of the
            * old state of todo, and if the id matches, we 
            * overwrite only the task section of the todo, and
            * keep other parts intact, that is why we have ...
            * 
            * Otherwise, we just return the current element and 
            * add it to the object array unchanged
            */
            todo => {
                if (todo.id === id) {
                    return { ...todo, task: updatedTask }
                }

                return todo;
            }
        );

        this.setState({
            todos: updatedTodos
        });
    }

    toggleCompletion(id) {
        const updatedTodos = this.state.todos.map(

            todo => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed }
                }

                return todo;
            }
        );

        this.setState({
            todos: updatedTodos
        });
    }

    render() {
        const todos = this.state.todos.map(todo => {
            return <Todo
                key={todo.id}
                id={todo.id}
                task={todo.task}
                completed={todo.completed}
                removeTodo={this.remove}
                updateTodo={this.update}
                toggleTodo = {this.toggleCompletion} />
        })
        return (
            <div className="TodoList">
                <h1>Todo List! <span>A Simple Todo List App</span>  </h1>
                <ul>
                    {todos}
                </ul>
                <NewTodoForm createTodo={this.create} />
            </div>
        );
    }
}

export default TodoList;