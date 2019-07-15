import React, { useContext } from 'react';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import TodoItem from './TodoItem.jsx';

//context
import { TodosContext } from './context/todo.context.jsx';

function TodoList() {
    const {todos} = useContext(TodosContext);
    const todolist = (
        <Paper>
            <List>
                {todos.map((todo, i) => (
                    /*
                    * So recall we had issues where react yelled at us for having
                    * adjacent element? we fix that with fragment which looks like this
                    * <> </>, however, if we want to pass something, then
                    * we have to type <React.Fragment> </React.Fragment>
                    */
                    < React.Fragment key={i}>
                        <TodoItem 
                            {...todo} 
                            key = {todo.id}
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
                        {i < todos.length - 1 && <Divider />}
                    </React.Fragment>
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
        { todos.length > 0 ? todolist: null }
        </>
    )
}

export default TodoList;