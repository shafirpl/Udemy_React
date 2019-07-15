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

    /*
    * useState requires a initial value. So we wrote an arrow function to determine what value
    * to be passed. Our aim is to actually first see if we do have anything stored on the local 
    * storage, and if it, use that. If not, then pass the defaultVal that we get.
    */
    const [state, setState] = useState(() => {
        let val;
        /*
        * this is called short circuit evaluation. It will first try to grab the stored value 
        * using the key, and if it can't find it, it will store the defaultVal. Also 
        *    
        */
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
    * 
    * So what will actually happen, is that we pass/return the setState function to others who 
    * use this, and those other will call setState function to change this state. And whenever
    * this state is changed, it will run the useEffect function.
    */
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state,setState];
}

export default useLocalStorage;