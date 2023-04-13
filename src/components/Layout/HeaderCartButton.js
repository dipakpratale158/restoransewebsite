import { useContext, useEffect, useState } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const [btnhighlited,setbtnhighlited]=useState(false)
  const cartCtx = useContext(CartContext);
  const {items}=cartCtx

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);


const btnclasses=`${classes.button} ${btnhighlited ? classes.bump:""}`

useEffect(()=>{
  if(items.length===0){
    return
  }
  setbtnhighlited(true)
const timer=setTimeout(()=>{
  setbtnhighlited(false)
return()=>{
  clearTimeout(timer)
}
},300)

},[items])

  return (
    <button className={btnclasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
