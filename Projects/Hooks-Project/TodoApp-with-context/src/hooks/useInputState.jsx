/*
* This file has been copied from /Udemy_Colt_Steele_React/react-bootcamp-materials/25-react-hooks-intro/react-hooks-demos/src/hooks
*/
import { useState } from "react";
/*
* This means that when we call this component in TodoForm, we have to call it like a function,
* and pass an argument to it, just like useState. The argument will be copied over to initialVal
* also like setState, we have to return the state and a function to update the state
* we have another function to reset the input as well.
* we have to call it like this:
* const [value, handleChange, reset] = useInputState("");
* it means the initalVal will be an empty string
*/
export default initialVal => {
  const [value, setValue] = useState(initialVal);
  const handleChange = e => {
    setValue(e.target.value);
  };
  const reset = () => {
    setValue("");
  };
  return [value, handleChange, reset];
};
