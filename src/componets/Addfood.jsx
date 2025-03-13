  import React, { useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext';
import Header from "./Header"
  const Addfood = () => {
    const loggedData=useContext(UserContext);

    const[data,setdata]=useState({
      name:"",
      calories:"",
      protein:"",
      fats:"",
      fiber:"",
      image:""
    })

    function imagebase64(file){
      const reader=new FileReader();
      reader.readAsDataURL(file);
    
      const data=new Promise((resolve,reject)=>{
          reader.onload=()=>resolve(reader.result);
          reader.onerror=(err)=>reject(err);
      })
      return data;
  }

  async function handleImage(e){
      const file=e.target.files[0];

      const image=await  imagebase64(file);       
      setdata({...data,
      image:image
    })

  }

  function handleInput(e){
    setdata({
      ...data,
      [e.target.name]:e.target.value
    })
  }
  function handleSubmit(e){
    e.preventDefault();
    setdata({
      name:"",
      calories:"",
      protein:"",
      fats:"",
      fiber:"",
      image:""
    });
    fetch('http://localhost:4000/addfooditem',{
      method:"POST",
      headers:{
        "Authorization":"Bearer "+loggedData.LoggedUser.token,
        "Content-type":"application/json"
      },
      body:JSON.stringify(data)
    })
    .then((res)=>res.json())
    .then((data)=>alert(data.message))
    .catch((err)=>console.log(err));
    
  }


  return (
    
   
    <div className='container food-page '>
    <Header/>
      <>
      <form className='section' onSubmit={handleSubmit}>
      <div className='addfood-section'>
        <label>
          <h3 className='title'>Food Name:</h3>
          <input type='text' placeholder='Enter' name='name' onChange={handleInput} className='inp inp1'/></label>
      </div>
      <div className='food-details-section'>
        <label>
          <h3 className='title'>Calories</h3>
          <input type='text' className='inp inp2' name='calories' onChange={handleInput} placeholder='Enter Calories'/>
        </label>
        <label>
          <h3 className='title'>Carbohydrates</h3>
          <input type='text' className='inp inp2' name='carbohydrates' onChange={handleInput} placeholder='Enter Calories'/>
        </label>
        <label>
          <h3 className='title'>Proteins</h3>
          <input type='text' className='inp inp2' name='protein' onChange={handleInput} placeholder='Enter Calories'/>
        </label>
        <label>
          <h3 className='title'>Fats</h3>
          <input type='text' className='inp inp2' name='fats'onChange={handleInput} placeholder='Enter Calories'/>
        </label>
        <label>
          <h3 className='title'>Fiber</h3>
          <input type='text' className='inp inp2' name='fiber' onChange={handleInput} placeholder='Enter Calories'/>
        </label>

      </div>
      <div className='upload-section'>
        <div >
        <h3 className='ti'> Upload Image</h3>
          <input type='file' onChange={handleImage} />
        </div>
        <div>
          <button className='btn'> Add Food</button>
        </div>
        
      </div>
      </form>
      
      </>
    </div>
    
  )
}

export default Addfood
