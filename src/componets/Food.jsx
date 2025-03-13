import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'

const Food = ({food}) => {
    const loggedData=useContext(UserContext);

    const [quantity,setquantity]=useState(100)
    const [foods,setFoods]=useState({})
    const [foodInitial,setFoodInitial]=useState({})
    useEffect(()=>{
        setFoods(food)
        setFoodInitial(food)
    },[food])

    function calculate(e){
      
      if(e.target.value.length!==0){
        let qua=Number(e.target.value);
        setquantity(qua);
        let copyfood={...foods}
            
            copyfood.protein=(foodInitial.protein*qua)/100;
            copyfood.carbohydrates=(foodInitial.carbohydrates*qua)/100;
            copyfood.fats=(foodInitial.fats*qua)/100;
            copyfood.fiber=(foodInitial.fiber*qua)/100;
            copyfood.calories=(foodInitial.calories*qua)/100;

            console.log(copyfood)
                setFoods(copyfood)
            }  
        }
    

    function TrackFoodItem(){
        let trackedItem={
            userId:loggedData.LoggedUser.userid,
            foodId:food._id,
            details:{
                calories:foods.calories,
                protein:foods.protein,
                carbohydrates:foods.carbohydrates,
                fats:foods.fats,
                fiber:foods.fiber
            },
            quantity:quantity
        }
        alert(food.name +" added Successfully")
        fetch('http://localhost:4000/track',{
            method:"POST",
            body:JSON.stringify(trackedItem),
            headers:{
                "Authorization":"Bearer "+loggedData.LoggedUser.token,
                "Content-type":"application/json"
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
        })
        .catch((err)=>{
            console.log(err);
        })
        
        // console.log(track);
    }

  return (
    <div className='food'>
          <div className='food-img'>
            {
              foods.image!=null?(<img src={food.image} alt="not found" className='food-image'/>):
              (<img src="https://th.bing.com/th?id=OIP.9BO5ezpeO0Qpe57cf4ywvgAAAA&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="not found" className='food-image' />)
            }
                
          </div>
          <div className='right'>
           <h2> {food.name} ({foods.calories} Kcal for {quantity}Gm)</h2>
                <div className='food-details'>

           
                      <div className='nutrient'>
                        <p className='title'>Protein</p>
                        <p className='n-value'>{foods.protein}gm</p>
                      </div>
                      <div className='nutrient'>
                        <p className='title'>Carbohydrates</p>
                        <p className='n-value'>{foods.carbohydrates}gm</p>
                      </div>
                      <div className='nutrient'>
                        <p className='title'>Fats</p>
                        <p className='n-value'>{foods.fats}gm</p>
                      </div>
                      <div className='nutrient'>
                        <p className='title'>Fiber</p>
                        <p className='n-value'>{foods.fiber}gm</p>
                      </div>

                      <div className="track-control">
                      <input type='number' placeholder='Quantity In Gms'   className='inp' onChange={calculate}/>
                      <button className='btn' onClick={TrackFoodItem}>Track</button>
                      </div>
                     
                </div>
       </div>
          

      </div>
  )
}

export default Food
