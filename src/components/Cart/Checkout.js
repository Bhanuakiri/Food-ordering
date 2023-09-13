import classes from './checkout.module.css'
import { useRef,useState } from 'react';

const isempty = value => value.trim() ==='';
const isNotpin = value => value.trim().length !==5;

const Checkout = (props) =>{
    const [forminputsValidity,setforminputsValidity] = useState({
        name :true,
        city : true,
        street : true,
        postal: true,
    });
    
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();
   const confirmHandler =(event)=>{
      event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
   
    const enteredNameIsValid = !isempty(enteredName);
    const enteredStreetIsValid = !isempty(enteredStreet);
    const enteredCityIsValid = !isempty(enteredCity);
    const enteredPostalCodeIsValid = !isNotpin(enteredPostal);

    setforminputsValidity({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        city: enteredCityIsValid,
        postal: enteredPostalCodeIsValid,
      });

    const formIsValid =
    enteredNameIsValid &&
    enteredStreetIsValid &&
    enteredCityIsValid &&
    enteredPostalCodeIsValid;

    if (!formIsValid){
        return;
    }
    
    props.onConfirm({
        name:enteredName,
        street:enteredStreet,
        city:enteredCity,
        postal:enteredPostal,
    });
   };
   const nameControlClasses = `${classes.control} ${
    forminputsValidity.name ? '' : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    forminputsValidity.street ? '' : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    forminputsValidity.postal ? '' : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    forminputsValidity.city ? '' : classes.invalid
  }`;

    return(
        <form className={classes.form} onSubmit={confirmHandler}>
        <div className={nameControlClasses}>
          <label htmlFor='name'>Your Name</label>
          <input type='text' id='name' ref={nameInputRef}/>
          {!forminputsValidity.name && <p>Please enter a valid name!</p>}
        </div>
        <div className={streetControlClasses}>
          <label htmlFor='street'>Street</label>
          <input type='text' id='street' ref={streetInputRef} />
          {!forminputsValidity.street && <p>Please enter a valid street name!</p>}
        </div>
        <div className={postalCodeControlClasses}>
          <label htmlFor='postal'>Postal Code</label>
          <input type='text' id='postal'ref={postalInputRef} />
          {!forminputsValidity.postal && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
        </div>
        <div className={cityControlClasses}>
          <label htmlFor='city'>City</label>
          <input type='text' id='city' ref={cityInputRef}/>
          {!forminputsValidity.city && <p>Please enter a valid city!</p>}
        </div>
        <div className={classes.actions}>
          <button type='button' onClick={props.onCancel}>
            Cancel
          </button>
          <button className={classes.submit}>Confirm</button>
        </div>
      </form>
    );
};
export default Checkout;