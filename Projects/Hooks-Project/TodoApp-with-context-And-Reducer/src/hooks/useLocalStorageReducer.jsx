import { useReducer, useEffect } from 'react';

/*
* This hook/file is used to store values to local storage so that we can use it later in
* our app
*
* I decided to go with the arrow function to illustrate how we can write functional
* based component and hooks with this way
*
* we could also do export default key => {}
*/

const useLocalStorageReducer = (key, defaultVal, reducer) => {

    // make piece of state based on the value of local storage

    /*
    * if we pass a function as third argument in useReducer, that function will
    * set up the initial state/value of that reducer. Here we want to see if there
    * is something already stored on the local storeage and use that as initial state.
    * However, if we don't have that,or if arrow function on third argument 
    * does't return anything,  use the defaultVal(the second argument) to be as initial state
    * But that won't actually happen because even if we have error, since we are using a try catch
    * function, we would get something back from this arrow function
    */
    const [state, dispatch] = useReducer(reducer, defaultVal, () => {
        let val;
        /*
        * this is called short circuit evaluation. It will first try to grab the stored value 
        * using the key, and if it can't find it, it will store the defaultVal. Also 
        *    
        */
        try {
            val = JSON.parse(window.localStorage.getItem(key) || String(defaultVal));
        }
        catch (err) {
            val = defaultVal;
        }
        return val;

    })



    // utilize useEffect to update that local storage when state change
    /*
    * Recall that if we want to run useEffect only when something specific changes, and not 
    * on other changes, we specify that as a second argument in [], since we want to run
    * this function only when the state changes, we specify [state]
    * Also local storage cannot take object, that is why we need to convert the object to string
    * 
    * So what will actually happen, is that we pass/return the setState function to others who 
    * use this, and those other will call setState function to change this state. And whenever
    * this state is changed, it will run the useEffect function.
    */
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, dispatch];
}

export default useLocalStorageReducer;