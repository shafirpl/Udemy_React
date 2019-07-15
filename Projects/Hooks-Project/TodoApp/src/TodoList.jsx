import React from 'react';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import TodoItem from './TodoItem.jsx';

function TodoList(props) {
    const todolist = (
        <Paper>
            <List>
                {props.todos.map((todo, i) => (
                    <>
                        <TodoItem 
                            {...todo} 
                            toogleTodo={props.toogleTodo}
                            removeTodo={props.removeTodo}
                            editTodo={props.editTodo}
                        />
                        {/* This above line is equivalent to the below line */}
                        {/* <TodoItem
                            task={todo.task}
                            key={todo.id}
                            id={todo.id}
                            completed={todo.completed}
                            toogleTodo={props.toogleTodo}
                            removeTodo={props.removeTodo}
                            editTodo={props.editTodo}
                        /> */}
                        {/*
                        * We don't want divider at the last item
                        * So what we are syaing here if index is less than
                        * the lenght, show it, and if not (lets say
                        * we had 5 todos, so at the last item i value will be 4, and since there
                        * are 5 items, props.todos.length-1 will return 4, so they don't fullfil
                        * the condition), don't show it
                        */}
                        {i < props.todos.length - 1 && <Divider />}
                    </>
                ))}
            </List>

        </Paper>
    )
    return (
        /*
        * This is my code, i rewrote Colt's code to simplify stuff
        * What i am saying here is that, if we have some todos, which means
        * the lenght is greater that 0, render all the stuff written in todolist
        * otherwise return null
        */
        <>
        { props.todos.length > 0 ? todolist: null }
        </>
    )
}

export default TodoList;