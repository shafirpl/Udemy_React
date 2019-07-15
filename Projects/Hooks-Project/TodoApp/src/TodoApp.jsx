import React, {useEffect } from 'react';


// material ui stuff
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';

//other components
import TodoList from './TodoList.jsx';
import TodoForm from './TodoForm.jsx';
import useTodoState from './hooks/useTodoState.jsx';



function TodoApp() {

    const firstinitialTodos = [
        { id: 1, task: "Walk", completed: false },
        { id: 2, task: "Wash Car", completed: true },
        { id: 3, task: "Play GTA Online", completed: false }

    ]

    //this is for the todo items state
    /*
    * What we are doing here is that, we are seeing if we have local storage, and if we have
    * use that, otherwise, start with an empty array. I think the way it works that: if we have an empty
    * array, which will happen if there is no local storage, the first part of the or argument will 
    * be false, so initialTodos will take the second one
    */
    const initialTodos = JSON.parse(window.localStorage.getItem("todos")) || firstinitialTodos ; 

    /*
    * We mainly moved all the functions to a different file to keep it clean. That file 
    * returns all the todo list items, as well as all the necessary function. Then we do
    * array destructuring to grab thos functions and use them.
    */
    const { todos, addTodo, editTodo, toogleTodo, removeTodo } = useTodoState(initialTodos);

   

    /*
    * Recall we use useEffect any time we do an api call, want to store something
    * either on database or on local storage or fetch something
    * Here we are trying to store the todo stuff in the local storage. Here it will
    * run every time it detects a change in todos, so it is evident that we need to
    * use useEffect
    * 
    * Also recall, we need to store them as strings, not objects
    * And later convert them to object from string when we retrieve them
    * Browser local storage can only accept strings, not objects
    * 
    * It was not necessary to specify in the second argument [todos], as we only have one
    * state here, and this function will get triggered every time if any of the state changes,
    * and here we only have one. But it is just a good practice and I want to be consistent accross
    * everything
    */
    useEffect(() => {
        window.localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);


    return (
        <Paper
            style={{
                padding: 0,
                margin: 0,
                height: "100vh",
                backgroundColor: "#fafafa"

            }}
            elevation={0}
        >
            <AppBar color="primary" position="static" style={{ height: "60px" }} >
                <Toolbar>
                    <Typography color="inherit">
                        TODO WITH HOOKS
                    </Typography>
                </Toolbar>
            </AppBar>
            { /* justify center will center the app */}
            <Grid container justify="center" style={{ marginTop: "1rem" }}>
                <Grid item xs={11} md={8} lg={4}>
                    <TodoForm addTodo={addTodo} />
                    <TodoList
                        todos={todos}
                        removeTodo={removeTodo}
                        toogleTodo={toogleTodo}
                        editTodo = {editTodo}
                    />
                </Grid>
            </Grid>

        </Paper>
    )
}

export default TodoApp;

/*
* This is the app structure
* - TodoApp
*  - TodoForm
*  - TodoList
*   - TodoItem
* So this means our TodoApp will have TodoForm component and TodoList component
* Then TodoList will have TodoItem. TodoApp will manage all the lists and states
*/

/*
* Each todo item will have an
* id
* task
* completed: true or false

*/