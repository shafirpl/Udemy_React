import React from 'react';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import useInputState from './hooks/useInputState.jsx';


function TodoForm({ addTodo }) {
    /*
    * We need a state for storing the input from form
    * This input state file was copied from folder no 25 in react-bootcamp-material
    */
    const [value, handleChange, reset] = useInputState("");
    return (
        <Paper style={{margin: "1rem 0", padding: "0 1rem"}}>
            {/* 
           * So when we submit the form, it will add the new to do to the list
           * and reset the input fields
            */}
            <form onSubmit={(evt) => {
                // this will stop the app from refreshing the page when we submit the form
                evt.preventDefault();
                // this function is passed to this component as props from the TodoApp
                addTodo(value);
                // this function is coming from userInputState.jsx file, that we are using at line
                // 14
                reset();
            }}>
                <TextField 
                value={value} 
                onChange={handleChange} 
                fullWidth
                margin="normal" 
                label="Add New Todo"/>
            </form>
        </Paper>
    )
}

export default TodoForm;