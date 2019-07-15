/*
* We didn't have to name it like this
* we could just do todoReducer.jsx
* it is just a convention to name it like this
*/

import uuid from 'uuid/v4';

const reducer = (state, action) => {
    switch(action.type){
        case "ADD":
            // it is basically saying, return an array in which 
            // take everything from exisitng state array, and add in the new object starting with {} 
            return [...state, { id: uuid(), task: action.task, completed: false }];

        case "REMOVE":
            return state.filter(todo => todo.id !== action.id);

        case "TOGGLE":
            return state.map(todo =>
                todo.id === action.id ? { ...todo, completed: !todo.completed } : todo);

        case "EDIT":
            return state.map(todo =>
                todo.id === action.id ? { ...todo, task: action.newTask } : todo);

        default:
            return state;
    }

}

export default reducer;