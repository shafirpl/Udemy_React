import {useState, useEffect} from 'react';

/*
* This hook/file is used to store values to local storage so that we can use it later in
* our app
*
* I decided to go with the arrow function to illustrate how we can write functional
* based component and hooks with this way
*
* we could also do export default key => {}
*/

const useLocalStorage = (key, defaultVal) => {

    // make piece of state based on the value of local storage
    const [state, setState] = useState(() => {
        let val;
        try{
            val = JSON.parse(window.localStorage.getItem(key) || String(defaultVal));
        }
        catch(err) {
            val = defaultVal;
        }
        return val;
    });

    // utilize useEffect to update that local storage when state change
    /*
    * Recall that if we want to run useEffect only when something specific changes, and not 
    * on other changes, we specify that as a second argument in [], since we want to run
    * this function only when the state changes, we specify [state]
    * Also local storage cannot take object, that is why we need to convert the object to string
    */
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state));
    }, [state]);

    return [state,setState];
}

export default useLocalStorage;