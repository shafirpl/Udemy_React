/*
* This file has been copied from 
* /Udemy_Colt_Steele_React/react-bootcamp-materials/25-react-hooks-intro/react-hooks-demos/src/hooks
*/
import { useState } from "react";
// this means if we don't supply antyhing, it would default to false
function useToggle(initialVal = false) {
  // call useState, "reserve piece of state"
  const [state, setState] = useState(initialVal);
  const toggle = () => {
    setState(!state);
  };
  // return piece of state AND a function to toggle it
  return [state, toggle];
}
export default useToggle;
