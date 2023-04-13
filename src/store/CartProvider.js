import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0
};
const cartReducer = (state, action) => {
  // The reducer function takes the current state and the dispatched action as inputs.
  // In this case, the state object should have two properties: items and totalAmount.
  // The action should have a type property that is a string.

  if (action.type === 'ADD') {
    // If the action type is ADD, the reducer updates the state.
    // The updated state will have a new items array and an updated totalAmount.

    // Calculate the updatedTotalAmount by adding the price of the new item multiplied by its amount
    // to the previous totalAmount.
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

    // Check if the item being added already exists in the cart.
    // Find the index of the existing item in the items array using the findIndex method.
    const existingcartitemindex=state.items.findIndex(item=>item.id===action.item.id)

    // If the item already exists in the cart, update its amount property.
    // Create a new object with the updated amount and copy the other properties of the existing item
    // using the spread operator.
    const existingcartitem=state.items[existingcartitemindex]
    let updatedItems;

    if(existingcartitem){
      const updatedItem={
        ...existingcartitem,
        amount:existingcartitem.amount+action.item.amount
      }

      // Create a new items array by copying the previous one with the spread operator
      // and replacing the updated item at the index of the existing item.
      updatedItems=[...state.items]
      updatedItems[existingcartitemindex]=updatedItem
    }else{
      // If the item being added is new, add it to the end of the items array using the concat method.
      updatedItems = state.items.concat(action.item);
    }

    // Return a new state object with the updated items and totalAmount properties.
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }

  /////////////////////////////////////////////////////////////////////////
  if (action.type === 'REMOVE') {
    // Find the index of the item to remove in the cart items array.
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
  
    // Get the existing cart item from the cart items array using the index.
    const existingCartItem = state.items[existingCartItemIndex];
  
    // Calculate the new total amount by subtracting the price of the removed item from the current total.
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
  
    let updatedItems;
    if (existingCartItem.amount === 1) {
      // If the item quantity is 1, remove the item from the cart items array using the filter method.
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      // Otherwise, create a new cart item object with the same properties as the existing item
      // but with a decremented amount property.
      const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 };
  
      // Create a copy of the cart items array and replace the existing item with the updated item.
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
  
    // Return a new state object with the updated items array and total amount.
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
  // If the action type is not 'REMOVE', return the current state.
  return state;
  // If the action type is not ADD, return the current state.
  
};
const CartProvider = (props) => {
  // Set up the cart state using the useReducer hook.
  // cartReducer is a function that takes the current state and an action object,
  // and returns the new state based on the action type.
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  // Define a handler function for adding items to the cart.
  // The function takes an item object as input and dispatches an 'ADD' action to the cart reducer.
  const addItemToCartHandler = (item) => {
    dispatchCartAction({type: 'ADD', item: item});
  };

  // Define a handler function for removing items from the cart.
  // The function takes an item ID as input and dispatches a 'REMOVE' action to the cart reducer.
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({type: 'REMOVE', id: id});
  };

  // Define a cart context object that provides access to the cart state and handler functions.
  const cartContext = {
    items: cartState.items, // An array of cart items.
    totalAmount: cartState.totalAmount, // The total amount of the items in the cart.
    addItem: addItemToCartHandler, // A function to add an item to the cart.
    removeItem: removeItemFromCartHandler, // A function to remove an item from the cart.
  };

  // Render the CartContext.Provider component with the cart context object as value.
  // The provider component makes the cart context available to its child components.
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
