import React, {useContext} from 'react';

import TextField from '@material-ui/core/TextField';

import useInputState from './hooks/useInputState.jsx';

import {DispatchContext} from './context/todo.context.jsx';

import './EditToDoForm.css';


function EditToDoForm(props) {
    const dispatch  = useContext(DispatchContext);
    const [value, handleChange, reset] = useInputState(props.task);
    return (
        <form 
            className = "EditToDoForm"
            onSubmit={(evt) => {
            evt.preventDefault();
            dispatch({type:"EDIT", id: props.id, newTask: value})
            reset();
            /*
            * We are using it to change the state of isEditing from true to false, 
            * which is used inside TodoItem to decide whether we should show the task
            * or this edit form
            * 
            * If we don't pass anything to handleChange, the handleChange will
            * automatically take in the event object
            */
            props.toggleEditForm();
        }}>
            <TextField
                margin="normal"
                value={value}
                onChange={handleChange}
                fullWidth
                autoFocus
            />
        </form>


    )
}

export default EditToDoForm;