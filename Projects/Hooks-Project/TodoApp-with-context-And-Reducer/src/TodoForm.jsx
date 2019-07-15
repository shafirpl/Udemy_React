import React, {useContext} from 'react';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import useInputState from './hooks/useInputState.jsx';

//context
import {TodosContext} from './context/todo.context.jsx';


function TodoForm() {
    /*
    * We need a state for storing the input from form
    * This input state file was copied from folder no 25 in react-bootcamp-material
    */
    const [value, handleChange, reset] = useInputState("");
    /*
    * Remember, to use the context in child components, after wrapping them around with
    * the context provider, we have to use useContext and pass the context imported from 
    * the context file as arugment. Here this TodosContext is the one created using 
    * createContext method in the context file. We have to use that one.
    * 
    * Since this component was wrapped around in TodoApp.jsx file with the context provider,
    * we have access to all the functions passed as value to that context (see the context file)
    * And basically they have addTodo, editTodo, removeTodo and toggleTodo functions
    */
    const { dispatch } = useContext(TodosContext);
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
                dispatch({type:"ADD", task: value});
                // this function is coming from userInputState.jsx file, that we are using at line
                // 14
                reset();
            }}>
                {/* 
                * By default, we pass the event object to a function if we don't
                * specify the argument. So handleChange function is getting the event 
                * object, and e.target.value (where e is event) will provide the current 
                * value of this field, which we will use in useInputState.jsx file
                */}
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