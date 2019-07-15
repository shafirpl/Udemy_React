import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import useToggleState from './hooks/useToggleState.jsx';
import EditToDoForm from './EditToDoForm.jsx';

function TodoItem(props) {
    const [isEditing, toggle] = useToggleState();
    const editing = (
        <EditToDoForm
            editTodo={props.editTodo}
            key={props.key}
            id={props.id}
            task={props.task}
            /*
            * We are using it to change the state of isEditing from true to false,
            * which is used inside TodoItem to decide whether we should show the task
            * or this edit form
            */
            toggleEditForm={toggle}
        />
    )

    const listItem = (
        <>
            <Checkbox tabIndex={-1} checked={props.completed} onClick={() => props.toogleTodo(props.id)} />
            <ListItemText style={{ textDecoration: props.completed ? "line-through" : "none" }}>
                {props.task}
            </ListItemText>
            {/* 
            * List item secondary action allows the buttons to be placed
            * on the right end of the list item
            */}
            <ListItemSecondaryAction>
                <IconButton aria-label="Delete" onClick={() => props.removeTodo(props.id)}>
                    <DeleteIcon></DeleteIcon>
                </IconButton>
                <IconButton aria-label="Edit" onClick={toggle}>
                    <EditIcon></EditIcon>
                </IconButton>
            </ListItemSecondaryAction>
        </>
    )
    return (
        <ListItem style={{height: "64px"}}>
            {isEditing ? editing : listItem}

        </ListItem>
    )
}

export default TodoItem;