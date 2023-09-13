import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import react from 'react';
import { useContext,useState} from 'react';
import CartItem from './CartItem';
import CartContext from '../../store/context-cart';
import Checkout from './Checkout';

const Cart =(props) => {
      const [Ischeckout,setIscheckout]=useState(false);
      const[issubmitting,setissubmitting] =useState(false);
      const[didsubmit,setdidsubmit] =useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount= `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems= cartCtx.items.length>0;
    const cartItemRemoveHandler=(id)=>{
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler=(item)=>{
        cartCtx.addItem({...item,amount:1});
    };
    const orderHandler=()=>{
       setIscheckout(true);
    };
        const submitorderHandler = async (userData) =>{
            setissubmitting(true);
                await fetch('https://food-ordering-2fa21-default-rtdb.firebaseio.com/orders.json',{
                method:'POST',
                body:JSON.stringify(
                    {
                        user:userData,
                        orderedItems:cartCtx.items,
                    }
                )
            });

            setissubmitting(false);
            setdidsubmit(true);
            cartCtx.clearCart();
        };

    const modelActions =(
        <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={orderHandler}>
            Order
          </button>
        )}
      </div>
     );


 const cartItems =( <ul className={classes['cart-items']}> {cartCtx.items.map((item) =>(
    <CartItem
        key={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
        onRemove={cartItemRemoveHandler.bind(null,item.id)}
        onAdd={cartItemAddHandler.bind(null,item)}
    />
 ))}
 </ul>
 );
 const cartmodelcontent =(
    <react.Fragment>
        {cartItems}
    <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
    </div>
    {Ischeckout &&<Checkout onConfirm={submitorderHandler} onCancel={props.onClose}/>}
    {!Ischeckout && modelActions}
    </react.Fragment>   
 );
 const issubmittingModelcontent =<p>Placing your order....</p>;
 const didSubmitModelcontent = <react.Fragment>
    <p>Ordered placed Suceesfully</p>
    <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
        </div>
 </react.Fragment> ;
    return (
     <Modal onClose={props.onClose}>
         {!issubmitting && !didsubmit && cartmodelcontent}
         {issubmitting && issubmittingModelcontent}
         {!issubmitting && didsubmit && didSubmitModelcontent}
     </Modal>
     );
};
export default Cart;
