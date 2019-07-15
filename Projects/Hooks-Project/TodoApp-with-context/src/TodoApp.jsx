import React, { useEffect } from 'react';


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

//context
import { TodosProvider } from './context/todo.context.jsx';

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

function TodoApp() {

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
                    {/* 
                    * Remember, in order for context to work, we have to do two things:
                    * 1. We need to wrap the child components, where we would use the 
                    * the context, within the theme provider.
                    * Here we are doing exactly that
                    */}
                    <TodosProvider>
                        <TodoForm />
                        <TodoList />
                    </TodosProvider>

                </Grid>
            </Grid>

        </Paper>
    )
}

export default TodoApp;

