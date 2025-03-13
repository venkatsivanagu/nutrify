import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import Header from './Header'
const Diet = () => {
    const loggedData=useContext(UserContext)
    const[items,setitems]=useState([])
    const [date,setdate]=useState(new Date())

    let [total,setTotal]=useState({
        totalColaries:0,
        totalProtein:0,
        totalCarbohydrates:0,
        totalFats:0,
        totalFiber:0
        
    })


    useEffect(()=>{
        fetch(`http://localhost:4000/track/${loggedData.LoggedUser.userid}/${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`,{
            method:"GET",
            headers:{
                "Authorization":"Bearer "+loggedData.LoggedUser.token
            }
        })
        .then((res)=>res.json())
        .then((item)=>{
            setitems(item)
            
        })
        .catch((err)=>{
            console.log(err);
        })
        console.log("food items:",items)
    },[date])
    useEffect(()=>{
        calculateTotal()
    },[items])


    function calculateTotal(){
        let totalcopy={
            totalColaries:0,
            totalProtein:0,
            totalCarbohydrates:0,
            totalFats:0,
            totalFiber:0
            
        }

        items.forEach((item)=>{
            totalcopy.totalColaries+=item.details.calories;
            totalcopy.totalProtein+=item.details.protein;
            totalcopy.totalCarbohydrates+=item.details.carbohydrates;
            totalcopy.totalFats+=item.details.fats;
            totalcopy.totalFiber+=item.details.fiber;
        })
        setTotal(totalcopy)
    }


  return (
    <div className='container diet-container'>
        <Header/>
        <input type='date' className='date-search' onChange={(e)=>{setdate(new Date(e.target.value))}}/>
    
                    {
                        items.map((item)=>{
                            

                            return(
                                <div className='item' key={item._id}>
                                    <h2>{item.foodId.name} ({item.details.calories}Kcal for {item.quantity}g)</h2>
                                    <p>protein {item.details.protein}g Carbohydrates {item.details.carbohydrates}g
                                        Fats {item.details.fats}g Fiber {item.details.fiber}g
                                    </p>
                                </div>
                            )
                        })
                    }

                    <h1 style={{color:"yellow", marginTop:'50px'}}>Total Calcories:</h1>

                {
                    items.length!==0?
                    (
                        <div className='item total-result'>
                            <h2>{total.totalColaries} Kcal </h2>
                            <p>protein {total.totalProtein}g Carbohydrates {total.totalCarbohydrates}g
                                Fats {total.totalFats}g Fiber {total.totalFiber}g
                            </p>
                        </div>
                    ):(<h1 className='container'>No Food Eaten </h1>)
                }
    </div>
  )
}

export default Diet
