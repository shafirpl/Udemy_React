import React, { Component } from "react";
import Box from "./Box.jsx";
import NewBoxForm from './NewBoxForm.jsx';
class BoxList extends Component {
  constructor(props) {
    super(props);
    // here if i did color: orange i would get an error
    // saying orange is not defined. So 
    // I have to make it a string
    this.state = { boxes: [] };
    this.create = this.create.bind(this);
    
  }

  // we will use an arrow function that is why we are 
  // not binding this
  remove(id){
    this.setState({
      //this means make a new array of boxes which
      // don't have the id of the passed id
      // filter method
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
      boxes: this.state.boxes.filter(box => box.id !== id)
    });
  }

  /*
  * This function will be used to create a new box
  * since the form where we input data like height and
  * color is used in a seperate component, what we will do
  * is that we will pass this function down to that component
  * NewBoxForm, and when we submit the form there, we will
  * call this function from inside the NewBoxForm using the 
  * handleSubmit function and pass the newBox parameter 
  * there
  */
  create(newBox) {
    this.setState({
      //here we are concatanating/adding the 
      //nexBox to the existing boxes.
      boxes: [...this.state.boxes, newBox]
    });
  }
  //we cannot access key from other components
  // that is why we need to have an id to store
  // the box id

  render() {
    const boxes = this.state.boxes.map(box => (
      <Box
        id={box.id}
        key={box.id}
        width={box.width}
        height={box.height}
        color={box.color}
        /*
        * here what is happening is that every
        * box has the removeBox function with its id
        * assigned, but it got never called. 
        * So in the box component whenever we click the x
        * button, since we have onClick function, this 
        * function gets fired and since it already had
        * the id with it, it just removes it
        */
        removeBox = {()=> this.remove(box.id)} />
    ));
    return (
      <div>
        <h1>Color Box Maker Thing</h1>
        {/* passing the create method as createBox props */}
        <NewBoxForm createBox={this.create} />
        {boxes}
      </div>
    );
  }
}

export default BoxList;
