// import React, { useState} from 'react';
import useLocalStorageState from './useLocalStorage.jsx';
// other functional stuff
import uuid from 'uuid/v4';
/*
* it means that when we call the function, we have to pass some 
* values to it and whatever we pass it, it will be stored in initialTodos
* Look at the context file in the context folder to see how we are calling it
*/
export default initialTodos => {
    // const [todos, setTodos] = useState(initialTodos);
    // this is after colt's last video
    const [todos, setTodos] = useLocalStorageState("todos", initialTodos);
    /*
    * This function adds a new todo item
    */
    const addTodo = newTodoText => {
        /*
        * Since setTodo overwrite exisitng todo, we have to pass all the existing todos
        * and then add the new to do. What it means that: if we only pass the new added to do, 
        * it will update the state with the new to do,
        * so our old to do, if we have multiple, all of them
        * will be overwritten/gone: :C So we need to add the to do to the existing to dos 
        * and then update the state
        * 
        * This setTodo function is the setState function in useLocalStorage.jsx, it overwrites
        * the existing state with the new passed value, and as soon as that
        * state is changed, the useEffect function is called, which sets up the 
        * new local storage.
        */
        const newTodo = [...todos, { id: uuid(), task: newTodoText, completed: false }];
        setTodos(newTodo);

    }

    // this function deletes a to do
    const removeTodo = todoId => {
        //filter out removed to do
        const updatedTodos = todos.filter(todo => todo.id !== todoId);

        //call settodos with new todos array to set up the state
        setTodos(updatedTodos);
    }

    // this function toggles the state, like from completed to not completed and vice-versa for todos
    /*
    * what it does is that it checks if the todo.id matches, if not, it just returns that item,
    * and if it matches, then it takes everything from that todo and then change the completed 
    * state. Lets say the id is 2, so 0 id won't match, so it will return the 0th id, 1st id,
    * and then 2nd id with changed completed.
    * Now updatedTodos will be an array, in which 0 and 1st idth todo will be as they were 
    * in the todos array, but the 2nd one will have toogled completed field.
    * 
    * We are basically here returning the array element and building up the array, that is
    * why we need to return it. Where the id doesn't match, return the unaltered element to build up
    * the array, and where id matches, return with toggled completed field.
    */
    const toogleTodo = (todoId) => {
        const updatedTodos = todos.map(todo =>
            todo.id === todoId ? { ...todo, completed: !todo.completed } : todo);
        setTodos(updatedTodos);
    }

    // this function takes the edited task and updates the state
    const editTodo = (todoId, newTask) => {
        const editTodos = todos.map(todo =>
            todo.id === todoId ? { ...todo, task: newTask } : todo);
        setTodos(editTodos);
    }

    // here since we are returning objects, we have to use {} instead of ()
    return {
        todos,
        addTodo: addTodo,
        editTodo: editTodo,
        toogleTodo: toogleTodo,
        removeTodo: removeTodo
    }


}






