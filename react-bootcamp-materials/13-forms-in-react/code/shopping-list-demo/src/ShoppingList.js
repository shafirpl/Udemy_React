import React, { Component } from "react";
import ShoppingListForm from "./ShoppingListForm";
import uuid from "uuid/v4";

class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { name: "Milk", qty: "2 gallons", id: uuid() },
        { name: "Bread", qty: "2 loaves", id: uuid() }
      ]
    };
    this.addItem = this.addItem.bind(this);
  }
  addItem(item) {

    
    let newItem = { ...item, id: uuid() };
    // what we are doing here is that 
    // we are taking all the items by doing ...,
    // then we are adding one item to it, whatever we 
    // have ater , is being concataneted
    // then we pass it to the shoppinglistform, and
    // when we submit the form written in shoppinglistform, 
    // we call the addItem function from that component
    // and add the item to the parent component
    this.setState(state => ({
      items: [...state.items, newItem]
    }));
  }
  renderItems() {
    return (
      <ul>
        {this.state.items.map(item => (
          <li key={item.id}>
            {item.name}:{item.qty}
          </li>
        ))}
      </ul>
    );
  }
  render() {
    return (
      <div>
        <h1>Shopping List</h1>
        {this.renderItems()}
        <ShoppingListForm addItem={this.addItem} />
      </div>
    );
  }
}
export default ShoppingList;
