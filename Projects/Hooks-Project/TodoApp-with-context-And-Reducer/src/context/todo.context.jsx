/*
* The filename is kinda random, we could do todoContext.jsx. It
* is kind of convention to name context file as something.context.jsx
*/

import React, {createContext} from 'react';


import todoReducer from '../reducer/todo.reducer.jsx';
import useLocalStorageReducer from '../hooks/useLocalStorageReducer.jsx';

const defaultTodos = [
    {id: 1, task: "Play GTA Online", completed: false},
    {id: 2, task: "Buy something", completed: false}
]

/*
* The reason we have two context is for performance improvmenet. Right now everything re renders
* for even small changes. If we split it up into two, we can prevent unnecessary re renders.
*
* Look at the google doc app performance improvment section to understand the reason
*/
export const TodosContext = createContext();
export const DispatchContext = createContext();

export function TodosProvider(props){
    const [todos, dispatch] = useLocalStorageReducer("todos", defaultTodos, todoReducer);

    /*
    * Here we are using the theme provider
    */
    return(
        <TodosContext.Provider value={todos}>
            <DispatchContext.Provider value={dispatch}>
            {props.children}
            </DispatchContext.Provider>
        </TodosContext.Provider>
    )
}