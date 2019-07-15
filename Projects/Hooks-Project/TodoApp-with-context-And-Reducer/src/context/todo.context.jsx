/*
* The filename is kinda random, we could do todoContext.jsx. It
* is kind of convention to name context file as something.context.jsx
*/

import React, {createContext, useReducer} from 'react';

import todoReducer from '../reducer/todo.reducer.jsx';


const defaultTodos = [
    {id: 1, task: "Play GTA Online", completed: false},
    {id: 2, task: "Buy something", completed: false}
]

export const TodosContext = createContext();

export function TodosProvider(props){
    const [todos, dispatch] = useReducer(todoReducer,defaultTodos);

    /*
    * Here we are using the theme provider
    */
    return(
        <TodosContext.Provider value={{todos, dispatch}}>
            {props.children}
        </TodosContext.Provider>
    )
}