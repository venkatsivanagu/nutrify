import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import Food from './Food';
import Header from './Header';


const Track = () => {
    const loggedData=useContext(UserContext);

    const [foodItems,setFoodItems]=useState([])

    const [food,setFood]=useState(null);

    
  useEffect(()=>{
    console.log(food)
   

  })
  function handleSearch(e){
    if(e.target.value!==""){
      fetch(`http://localhost:4000/getitem/${e.target.value}`,{
      method:"GET",
      headers:{
        "Authorization":"Bearer "+loggedData.LoggedUser.token
      }
    })
    .then((res)=>res.json())
    .then((data)=>{
      if(data.message===undefined){
        setFoodItems(data)
        
      }else{
        setFoodItems([])
      }

      
      
    })
    .catch((err)=>{
      console.log(err);
    })
    }else{
      setFoodItems([])
    }
  }

  function displayItem(item){
    {
      alert(item)
    }

  }

  return (
    <section className='container track-container'>
      <Header/>
      <div className='search'>
          <input type='search' className='search-inp' placeholder='Search Food item'  onChange={handleSearch}/>

          {
            foodItems.length!==0?(
              <div className='search-result'>
            {
              foodItems.map((item)=>{
                return(
                  <p className='item' key={item._id} onClick={()=>{setFood(item),setFoodItems([])}}>{item.name} </p>
                )
              })
            }

          </div>
            ):null
          }
          
      </div>
      {
        food!==null?(
          <Food food={food}/>
        ):(<h1 className='container empty-container'>Search the Food item</h1>)
      }
      


    </section>

  )
}

export default Track
