import React , {useContext,useEffect,useState} from "react";
import CartIcon from '../Cart/Carticon';
import classes from './HeaderCartButton.module.css';
import CartContext from "../../store/context-cart";
const HeaderCartButton = props =>{

     const[btnIsHighlighted,setBtnIsHighlighted]=useState(false);
  const CartCtx =useContext(CartContext);
  const {items} =CartCtx;
   const numberOfCartItems =items.reduce((curNumber,item)=>{
        return curNumber + item.amount;
    },0);
     
    const btnclasses =`${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;
     useEffect(()=>{
        if(items.length === 0)
        {
            return;
        }
         setBtnIsHighlighted(true);

         const timer = setTimeout(()=>
         {
           setBtnIsHighlighted(false);
         },300);

         return () =>{
            clearTimeout(timer);
         };
    }, [items]);

    return (
    <button className={btnclasses} onClick={props.onClick}>
    <span className={classes.icon}>
    <CartIcon/>
    </span>
    <span> Your Cart</span>
    <span className={classes.badge}>
        {numberOfCartItems}
    </span>
    </button>
    );
};
 
export default HeaderCartButton;