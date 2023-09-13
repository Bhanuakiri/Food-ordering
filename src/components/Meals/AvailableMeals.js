import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import { useEffect,useState } from 'react';
import MealItem from './MealItem/MealItem';


  const AvailableMeals = () =>{
    const[meals,setmeals]= useState([]);
    const[isLoading,setisLoading]= useState(true);
    const[httperror,sethttperror]= useState();
      useEffect(()=>{
           const fetchmeals = async ()=>{
            const response = await fetch('https://food-ordering-2fa21-default-rtdb.firebaseio.com/meals.json');
           if(!response){
            throw new Error('something went wrong');
           }

           const responseData = await response.json();
            const loadedmeals=[];
            for (const key in responseData){
              loadedmeals.push({
                id: key,
                name :responseData[key].name,
                description:responseData[key].description,
                price:responseData[key].price,
              });
            };
              setmeals(loadedmeals);
              setisLoading(false);
            };
           
            fetchmeals().catch((error)=>{
              setisLoading(false);
              sethttperror(error.message);
            });

      },[]);

      if(isLoading){
        return(
          <section className={classes.MealsLoading}>
            <p>Loading...</p>
          </section>
        );
      }
       
      if(httperror){
        return(
          <section className={classes.Mealserror}>
            <p>{httperror}</p>
          </section>
        );
      }


    const mealsList = meals.map((meal) => (
    <MealItem 
         key={meal.id} 
         id ={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
    />
    ));
    return(
        <section className={classes.meals}>
        <Card>
        <ul>
                {mealsList}
            </ul>
            </Card>
            
        </section>
    );
  };
  export default AvailableMeals;
