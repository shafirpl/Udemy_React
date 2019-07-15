/*
* The filename is kinda random, we could do todoContext.jsx. It
* is kind of convention to name context file as something.context.jsx
*/

import React, {createContext} from 'react';

//importing the hooks
import useTodoState from '../hooks/useTodoState.jsx';

const defaultTodos = [
    {id: 1, task: "Play GTA Online", completed: false},
    {id: 2, task: "Buy something", completed: false}
]

export const TodosContext = createContext();

export function TodosProvider(props){
    const todoStuff = useTodoState(defaultTodos);

    /*
    * Here we are using the theme provider
    */
    return(
        <TodosContext.Provider value={todoStuff}>
            {props.children}
        </TodosContext.Provider>
    )
}